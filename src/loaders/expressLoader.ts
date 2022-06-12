import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from '../api/index';

export default (app: Application) => {
  app.use(helmet());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(routes());
};
