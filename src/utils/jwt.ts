import * as jwt from 'jsonwebtoken';
import config from '../config/index';

const { JWT } = config;
export const sign = (payload: jwt.JwtPayload, options?: jwt.SignOptions) => {
  if (options) return jwt.sign(payload, JWT.secret, options);
  return jwt.sign(payload, JWT.secret);
};
