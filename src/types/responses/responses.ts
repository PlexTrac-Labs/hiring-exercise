import { User } from 'models/user';

export interface Session {
  token: string;
  user: User;
}
