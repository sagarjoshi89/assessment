import { Injectable } from '@angular/core';
import { User } from '../component/user-profile/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList = new Map<string, User>();

  constructor() { }

  setUserData(userName: string, userObj: User) {
    this.userList.set(userName, userObj);
  }

  getUserData(userName: string): User {
    const newObj = <User>this.userList.get(userName);
    return newObj;
  }

  isUserExists(userName): boolean {
    return this.userList.has(userName);
  }
}
