import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/test', route);
  route.get('/', (req, res, next) => {
    res.send('hello world');
  });
};
