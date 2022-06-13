import { User } from '../entities/User';

// express.Request - namespace - user
declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}
