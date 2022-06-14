import { Service } from 'typedi';
import { Provider, User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

@Service()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async signUp(userId: number, nickname: string, location: string) {
    const user = await UsersRepository.findOne({ where: { id: userId } });

    if (!user) throw new Error('not exists user');
    const status = 1; // config 로 조작 필요

    const updatedUser = await this.update(userId, { nickname, location, status } as User);
    return updatedUser;
  }

  async update(userId: number, payload: User) {
    const user = await UsersRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('not exists user'); // Error 커스텀 만들기 필요
    const updatedUser = await UsersRepository.update({ id: userId }, { ...payload }).then(async () => {
      return UsersRepository.findOne({ where: { id: userId } });
    });
    return updatedUser;
  }

  async findOneByProvider(providerType: Provider, providerId: string) {
    const user = await UsersRepository.findByProvider(providerType, providerId);
    return user;
  }

  async createUser(providerType: Provider, providerId: string, providerData: string) {
    const newUser = await UsersRepository.create({ providerType, providerId, providerData });
    return UsersRepository.save(newUser);
  }
}
