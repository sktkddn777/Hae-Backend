import { Provider, User } from '../entities/User';
import { AppDataSource } from '../loaders/mysqlLoader';

export const UsersRepository = AppDataSource.getRepository(User).extend({
  findByProvider(providerType: Provider, providerId: string) {
    return this.findOne({
      where: {
        providerType,
        providerId,
      },
    });
  },
});
