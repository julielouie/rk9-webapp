import { IGroup } from '../models/group';

export class GroupMap {
  static toSimpleDTO(group: IGroup): IGroup {
    return this.toDTO(group);
  }

  static toDTO(group: IGroup): IGroup {
    return {
      id: group.id,
      name: group.name,
      members: group.members,
    };
  }
}
