import { Injectable } from '@angular/core';
import { User } from '../component/user-profile/user-profile';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList = new Map<string, User>();
  subject = new Subject();

  constructor() {
  }

  setUserData(userName: string, userObj: User) {
    this.userList.set(userName, userObj);
    this.subject.next(userName);
  }

  getUserData(userName: string): User {
    const newObj = <User>this.userList.get(userName);
    return newObj;
  }

  isUserExists(userName): boolean {
    return this.userList.has(userName);
  }

  getAllUserList() {
    return Array.from(this.userList.values());
  }

  getUserAddObservable() {
    return this.subject;
  }
}
