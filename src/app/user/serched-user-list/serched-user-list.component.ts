import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { User } from 'src/app/shared/component/user-profile/user-profile';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-serched-user-list',
  templateUrl: './serched-user-list.component.html',
  styleUrls: ['./serched-user-list.component.css']
})
export class SerchedUserListComponent implements OnInit, OnDestroy {

  users: User[];
  userAddObject: Subject<any>;
  @Output() userSelectionEvent = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = <User[]>this.userService.getAllUserList();
    this.userAddObject = this.userService.getUserAddObservable();
    this.userAddObject.subscribe(
      value => {
        this.users = <User[]>this.userService.getAllUserList();
      }
    );
  }

  ngOnDestroy() {
    this.userAddObject.unsubscribe();
  }

  loadUserData(userObject) {
    this.userSelectionEvent.emit(userObject);
  }

}
