import { IUser } from '../models/user';

export class UserMap {
  static toSimpleDTO(user: IUser): IUser {
    return this.toDTO(user);
  }

  static toDTO(user: IUser): IUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email ?? '',
      name: user.name ?? '',
    };
  }
}
