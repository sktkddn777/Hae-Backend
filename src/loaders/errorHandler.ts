import { Request, Application, Response, NextFunction } from 'express';

// Error 추가 필요

// last Error
export default (app: Application) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({ message: error.message });
  });
};
