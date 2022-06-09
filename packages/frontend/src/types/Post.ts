import { Group } from './Group';
import { User } from './User';

export interface Post {
  id?: string;
  user: Pick<User, 'id' | 'name'>;
  date: Date;
  group: Pick<Group, 'id' | 'name'>;
  oneOnOneUserId?: string;
  text?: string;
  media?: string | null;
}
