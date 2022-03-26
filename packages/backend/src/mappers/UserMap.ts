import { IUser } from '../models/user';

export class UserMap {
  static toSimpleDTO(user: IUser): Promise<IUser> {
    return this.toDTO(user);
  }

  static async toDTO(user: IUser): Promise<IUser> {
    return {
      id: user.id,
      username: user.username,
      email: user.email ?? '',
      name: user.name ?? '',
    };
  }
}
