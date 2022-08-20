import { IUser, ReturnUser } from '../models/user';

export class UserMap {
  static toSimpleDTO(user: IUser): ReturnUser {
    return this.toDTO(user);
  }

  static toDTO(user: IUser): ReturnUser {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      groups: user.groups,
      role: user.role,
      dogName: user.dogName,
      dogName2: user.dogName2 || '',
      dogName3: user.dogName3 || '',
      dogName4: user.dogName4 || '',
      dogName5: user.dogName5 || '',
    };
  }
}
