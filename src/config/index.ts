import 'dotenv/config';

export default {
  port: process.env.PORT,

  /* MySQL */
  db: {
    host: process.env.DB_HOST,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    port: +process.env.DB_PORT!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  /* Naver */
  naver: {
    client: process.env.NAVER_CLIENT,
    secret: process.env.NAVER_SECRET,
    redirect: process.env.NAVER_REDIRECT,
    state: process.env.NAVER_STATE,
  },

  /* JWT */
  JWT: {
    secret: process.env.JWT_SECRET!,
    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES,
  },

  /* cookie */
  cookie: {
    refreshTokenMaxAge: +process.env.COOKIE_REFRESH_MAX_AGE!,
  },
};
