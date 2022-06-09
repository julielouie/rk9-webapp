import { User } from './User';

export interface Group {
  id?: string;
  name: string;
  members: Pick<
    User,
    'id' | 'name' | 'email' | 'role' | 'dogName' | 'dogName2' | 'dogName3' | 'dogName4' | 'dogName5'
  >[];
}
