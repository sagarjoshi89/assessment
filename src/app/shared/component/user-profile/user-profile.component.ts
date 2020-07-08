import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { User } from './user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userProfileData: User;
  userAvatarUrl: string;
  userName: string;
  userLocation: string;

  constructor() { }

  ngOnInit() {
    this.userName = "-";
    this.userLocation = "-";
    this.userAvatarUrl = "assets/img/avatar.png";
  }

  ngOnChanges() {
    if (this.userProfileData != undefined) {
      this.userAvatarUrl = this.userProfileData.userAvatarUrl;
      this.userName = this.userProfileData.userName;
      this.userLocation = this.userProfileData.userLocation;
    }
  }
}
