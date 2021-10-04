import { User } from './user.models';

export function getUser(data: User[], id: string): User {
  return data.find(user => user.id === id);
}
