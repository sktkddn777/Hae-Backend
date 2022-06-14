import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from '../config';
import { Provider, User } from '../entities/User';
import { UsersService } from './UsersService';
import { sign } from '../utils/jwt';

interface TokenPayload extends JwtPayload {
  id?: number;
  nickname?: string;
  location?: string;
}

const ISSUER = 'HAE';

@Service()
export class AuthService {
  constructor(
    @Inject()
    private readonly userService: UsersService,
  ) {}

  async login(providerType: Provider, providerId: string) {
    const user = await this.userService.findOneByProvider(providerType, providerId);
    if (!user) throw new Error('not exists user');

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(),
    ]);

    return { user, accessToken, refreshToken };
  }

  async generateAccessToken(user: User) {
    const { id, nickname, location, isAdmin } = user;
    const payload: TokenPayload = {
      id,
      nickname,
      location,
      isAdmin,
    };
    const options: SignOptions = {
      expiresIn: config.JWT.accessExpires,
      issuer: ISSUER,
    };

    const accessToken = sign(payload, options);
    return accessToken;
  }

  async generateRefreshToken() {
    // Redis 도입 필요
    const payload = {};
    const options: SignOptions = {
      expiresIn: config.JWT.refreshExpires,
      issuer: ISSUER,
    };

    const refreshToken = sign(payload, options);
    return refreshToken;
  }
}
