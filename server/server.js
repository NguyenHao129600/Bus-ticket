import app from './app';
import db from './config/db';
import logger from './config/winston';

const server = app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

const shutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down server.`);
  server.close(async () => {
    try {
      await db.end();
      logger.info('Database pool closed.');
      process.exit(0);
    } catch (err) {
      logger.error(err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
