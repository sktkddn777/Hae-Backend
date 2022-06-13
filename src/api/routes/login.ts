import { Router, NextFunction, Request, Response } from 'express';
import { asyncErrorWrapper } from '../../utils/asyncErrorWrapper';
import config from '../../config';
import { checkOauthCode } from '../middlewares/checkOauthCode';

const route = Router();
const { naver } = config;

export default (app: Router) => {
  app.use('/login', route);

  // Oauth2 로그인
  route.get('/', checkOauthCode, (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world');
  });

  // authCode test
  route.get(
    '/authcode/naver',
    asyncErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver.client}&redirect_uri=${naver.redirect}&state=${naver.state}`;
      return res.redirect(url);
    }),
  );

  // redirect Code
  route.get(
    '/redirect',
    asyncErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
      const { code } = req.query;
      return res.send(code);
    }),
  );
};
