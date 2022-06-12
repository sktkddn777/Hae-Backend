import { Application } from 'express';
import errorHandler from './errorHandler';
import expressLoader from './expressLoader';
import mysqlLoader from './mysqlLoader';

export default (app: Application) => {
  mysqlLoader();
  expressLoader(app);
  errorHandler(app);
};
