import { Group } from './Group';

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  groups: Pick<Group, 'id' | 'name'>[];
  role: string;
  dogName: string;
  dogName2?: string;
  dogName3?: string;
  dogName4?: string;
  dogName5?: string;
}
