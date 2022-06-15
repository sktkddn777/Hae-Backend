import { NextFunction, Request, Response, Router } from 'express';
import { asyncErrorWrapper } from '../../utils/asyncErrorWrapper';
import { isValidSignUp, validate } from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post(
    '/',
    isValidSignUp,
    validate,
    asyncErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
      const { id, nickname, mbti } = req.body;
      res.send({ id, nickname, mbti });
    }),
  );
};
