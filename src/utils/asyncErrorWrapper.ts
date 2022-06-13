import { NextFunction, Request, Response } from 'express';

export const asyncErrorWrapper = (fn: any) => {
  // eslint-disable-next-line func-names
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
};
