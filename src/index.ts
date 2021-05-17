import * as dotenv from "dotenv";
dotenv.config();

import * as bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import methodOverride from 'method-override';
import path from 'path';
import config from './config';
import APIError from './lib/api-error';
import { sequelize } from './db';
import boot from './boot';
import { apiRoutes } from './api/';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser());
app.use(compression());
app.use(methodOverride());

app.use(helmet());

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'public/')));

const START_TIME = Date.now();
app.get('/status-check', (req, res) => {
  const version = require('../package.json').version;
  res.status(httpStatus.OK).json({
    version,
    startTime: START_TIME,
    upTime: Date.now() - START_TIME,
  });
});

app.use('/api', apiRoutes);

app.use((req, res, next) => {
  const err = new APIError('API not found!', httpStatus.NOT_FOUND);
  return next(err);
});

app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
  res.status(err && err.status || httpStatus.BAD_REQUEST).json({
    error: {
      message: err.message,
      status: err.status,
      stack: config.env === 'development' ? err.stack : {},
    },
    statusCode: err.status,
  });
});

sequelize.sync().then(() => {
  boot();
  app.listen(config.port, () => {
    console.log(`App is listening on port ${config.port}`);
  });
});

export default app;
