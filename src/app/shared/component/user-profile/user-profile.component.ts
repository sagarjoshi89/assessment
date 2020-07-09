import { Component, Input } from '@angular/core';
import { User } from './user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  @Input() userProfileData: User;
  userAvatarUrl: string;
  userName: string;
  userLocation: string;
  userHtmlUrl: string;

  constructor() { }

  ngOnChanges() {
    if (this.userProfileData !== undefined) {
      this.userAvatarUrl = this.userProfileData.userAvatarUrl;
      this.userName = this.userProfileData.userName;
      this.userLocation = this.userProfileData.userLocation;
      this.userHtmlUrl = this.userProfileData.userHtmlUrl;
    }
  }
}
