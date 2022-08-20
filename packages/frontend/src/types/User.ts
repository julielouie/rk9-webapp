import { Group } from './Group';

export interface User {
  id?: string;
  name: string;
  username: string;
  password?: string;
  groups: Group[];
  role: string;
  dogName: string;
  dogName2?: string;
  dogName3?: string;
  dogName4?: string;
  dogName5?: string;
}
