import app from './config/express';
import routes from './routes/index.js';
import swagger from './config/swagger';
import * as errorHandler from './middlewares/errorHandler';
import joiErrorHandler from './middlewares/joiErrorHandler';
import requestLogger from './middlewares/requestLogger';
import rateLimiter from './middlewares/rateLimiter';

app.get('/health', (req, res) => {
  return res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
  });
});

app.get('/swagger.json', (req, res) => {
  return res.json(swagger);
});

app.get('/swagger', (req, res) => {
  return res.redirect('/swagger/');
});

app.use(requestLogger);
app.use(rateLimiter);
app.use('/api', routes);

app.get(/^\/(?!api\/?).*/, (req, res) => {
  return res.sendFile(`${process.cwd()}/public/index.html`);
});

app.use(joiErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.genericErrorHandler);

export default app;
