import { Router, NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { User } from '../../entities/User';
import { asyncErrorWrapper } from '../../utils/asyncErrorWrapper';
import config from '../../config';
import { checkOauthCode, socialSignup } from '../middlewares/index';
import { AuthService } from '../../services';

const route = Router();
const { naver } = config;

export default (app: Router) => {
  app.use('/auth', route);

  // Oauth2 로그인
  route.get(
    '/login',
    checkOauthCode,
    socialSignup,
    asyncErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
      const { providerType, providerId } = req.user as User;
      const authServiceInstance = Container.get<AuthService>(AuthService);

      const { user, accessToken, refreshToken } = await authServiceInstance.login(providerType, providerId);

      res.cookie('Refresh', refreshToken, {
        httpOnly: true,
        secure: false, // true
        maxAge: config.cookie.refreshTokenMaxAge,
      });

      return res.status(201).json({
        nickname: user.nickname,
        location: user.location,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    }),
  );

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
