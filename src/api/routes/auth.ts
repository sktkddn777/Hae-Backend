import { Router, NextFunction, Request, Response } from 'express';
import { asyncErrorWrapper } from '../../utils/asyncErrorWrapper';
import config from '../../config';
import { checkOauthCode, socialSignup } from '../middlewares/index';

const route = Router();
const { naver } = config;

export default (app: Router) => {
  app.use('/auth', route);

  // Oauth2 로그인
  route.get('/login', checkOauthCode, socialSignup, (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    res.send('hello world');
  });

  // authCode test
  route.get(
    '/authcode/naver',
    asyncErrorWrapper(async (req: Request, res: Response) => {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver.client}&redirect_uri=${naver.redirect}&state=${naver.state}`;
      return res.redirect(url);
    }),
  );

  // redirect Code
  route.get(
    '/redirect',
    asyncErrorWrapper(async (req: Request, res: Response) => {
      const { code } = req.query;
      return res.send(code);
    }),
  );
};
