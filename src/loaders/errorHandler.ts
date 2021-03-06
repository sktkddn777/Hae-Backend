import { Request, Application, Response, NextFunction } from 'express';

// Error μΆκ° νμ

// last Error
export default (app: Application) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({ message: error.message });
  });
};
