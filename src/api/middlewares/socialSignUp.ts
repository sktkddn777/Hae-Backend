import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { User } from '../../entities/User';
import { UsersService } from '../../services';
import { asyncErrorWrapper } from '../../utils/asyncErrorWrapper';

export const socialSignup = asyncErrorWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { providerType, providerId, providerData } = req.user as User;

  const usersService = Container.get<UsersService>(UsersService);
  const user = await usersService.findOneByProvider(providerType, providerId);

  if (!user) {
    const newUser = await usersService.createUser(providerType, providerId, providerData);
    return res.status(200).json({
      id: newUser.id,
      message: 'need sign up',
    });
  }

  if (!user.nickname || !user.location) {
    return res.status(200).json({
      id: user.id,
      message: 'need sign up',
    });
  }
  return next();
});
