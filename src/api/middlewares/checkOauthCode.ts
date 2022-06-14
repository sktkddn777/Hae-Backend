import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { Provider } from '../../entities/User';
import config from '../../config/index';
import { asyncErrorWrapper } from '../../utils/asyncErrorWrapper';

const { naver } = config;

const getNaverUserInfoByOauth = async (providerType: Provider, accessToken: string) => {
  const url = 'https://openapi.naver.com/v1/nid/me';

  let providerId;
  let providerData;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const { id, ...naverAccount } = response.data.response;
  // eslint-disable-next-line prefer-const
  providerId = id;
  // eslint-disable-next-line prefer-const
  providerData = JSON.stringify(naverAccount);

  return { providerType, providerId, providerData };
};

const getNaverAccessToken = async (provider: string, authCode: string) => {
  const url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naver.client}&client_secret=${naver.secret}&redirect_uri=${naver.redirect}&code=${authCode}&state=${naver.state}`;
  const response = await axios.post(url, '', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  return response.data.access_token;
};

export const checkOauthCode = asyncErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
  // client로 부터 authcode 제공받음
  const { provider, authCode } = req.body;
  if (!(provider === 'kakao' || provider === 'naver')) throw new Error('wrong provider type');
  if (!authCode) throw new Error('not exists authCode');

  // accesstoken 발급
  const accessToken = await getNaverAccessToken(provider, authCode);
  if (!accessToken) throw new Error('invalid auth code');

  // accesstoken으로 유저 정보 요청
  const providerUserInfo = await getNaverUserInfoByOauth(provider, accessToken);
  if (!providerUserInfo) throw new Error('invalid accesstoken');

  // provider token 만료 필요
  req.user = providerUserInfo;
  return next();
});
