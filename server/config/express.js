import express from 'express';
import cors from 'cors';
import compression from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';

import constant from '../config/directory';
import env from '../config/env';

const app = express();

app.set('port', env.APP_PORT);
app.set('host', env.APP_HOST);
app.disable('x-powered-by');

app.use(express.static(constant.distDir));

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || !env.CORS_ORIGINS.length || env.CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(compression());
app.use(methodOverride());
app.use(express.json({ limit: env.REQUEST_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: env.REQUEST_BODY_LIMIT }));
app.use(express.static(constant.assetsDir));

export default app;
