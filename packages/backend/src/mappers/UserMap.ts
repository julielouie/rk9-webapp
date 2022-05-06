import { IUser, ReturnUser } from '../models/user';

export class UserMap {
  static toSimpleDTO(user: IUser): ReturnUser {
    return this.toDTO(user);
  }

  static toDTO(user: IUser): ReturnUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      groups: user.groups,
      role: user.role,
      dogName: user.dogName,
      dogName2: user.dogName || '',
      dogName3: user.dogName || '',
      dogName4: user.dogName || '',
      dogName5: user.dogName || '',
    };
  }
}
