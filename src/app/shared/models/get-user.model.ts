import {User} from '../../core/models/user.models';


// tslint:disable-next-line:typedef
export function getUser(data: User[], id: string) {
  return data.find(user => user.id === id);
}
