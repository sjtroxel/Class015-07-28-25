import { User } from './user';

export class Blog {
  id!: number;
  title: string = '';
  content: string = '';
  user_id?: number;
  user?: User;
}
