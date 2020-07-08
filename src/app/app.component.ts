import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from './shared/service/api.service';
import { ConstantData } from './shared/constant-data';
import { map } from 'rxjs/operators';
import { GitRepo } from './user/user-detail/user-git-repo-detail';
import { User } from './shared/component/user-profile/user-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contrado-assignment';
  searchedUserName: string;
  profileForm: FormGroup;
  userProfileData: any;
  userGitRepoData: any[];

  constructor(private fb: FormBuilder, private apiService: ApiService) {

  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    this.searchedUserName = this.profileForm.value.username;
    this.retrieveUserData();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  retrieveUserData() {
    let userRetrieveUrl = ConstantData.getUserURL + this.searchedUserName;
    this.apiService.getData(userRetrieveUrl).subscribe((data: any) => {
      if (data && data.message && data.message == "Not Found") {
        alert("User Not Found");
      } else {
        this.retrieveUserRepoData();
        //this.userProfileData = data;
        this.setUserProfile(data);
      }
    }, (exception: any) => {
      console.error(exception);
    })
  }

  /*retrieveUserRepoData(){
    let userRetrieveUrl = ConstantData.getUserRepoURL.replace("{username}",this.searchedUserName);
    this.apiService.getData(userRetrieveUrl).subscribe((data:any) => {
      if(data && data.message && data.message == "Not Found"){
        alert("User Data Not Found");
      } else {
        console.log(data);
      }
    },(exception:any) => {
      console.error(exception);
    })
  }*/

  retrieveUserRepoData() {
    let userRetrieveUrl = ConstantData.getUserRepoURL.replace("{username}", this.searchedUserName);
    this.apiService.getData(userRetrieveUrl).pipe(map((messages: GitRepo[]) => messages.sort((a1: GitRepo, a2: GitRepo) => a2.stargazers_count - a1.stargazers_count))).subscribe((data: any) => {
      if (data && data.message && data.message == "Not Found") {
        alert("User Data Not Found");
      } else {
        console.log(data);
        this.userGitRepoData = data.slice(0,5);
      }
    }, (exception: any) => {
      console.error(exception);
    })
  }

  resetForm() {
    this.profileForm.reset();
  }

  setUserProfile(data: any) {
    this.userProfileData = new User();
    this.userProfileData.userName = data.login;
    this.userProfileData.userAvatarUrl = data.avatar_url;
    this.userProfileData.userLocation = data.location;
  }


}
