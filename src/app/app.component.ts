import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from './shared/service/api.service';
import { ConstantData } from './shared/constant-data';
import { map } from 'rxjs/operators';
import { GitRepo } from './user/user-detail/user-git-repo-detail';
import { User } from './shared/component/user-profile/user-profile';
import { NgxSpinnerService } from "ngx-spinner";
import { Ngxalert } from 'ngx-dialogs';

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
  simpleAlert: any = new Ngxalert;

  constructor(private fb: FormBuilder, private apiService: ApiService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    this.spinner.show();
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
      this.retrieveUserRepoData();
      //this.userProfileData = data;
      this.setUserProfile(data);
    }, (exception: any) => {
      this.spinner.hide();
      this.setAlert(exception.statusText);
    })
  }

  retrieveUserRepoData() {
    let userRetrieveUrl = ConstantData.getUserRepoURL.replace("{username}", this.searchedUserName);
    this.apiService.getData(userRetrieveUrl).pipe(map((messages: GitRepo[]) => messages.sort((a1: GitRepo, a2: GitRepo) => a2.stargazers_count - a1.stargazers_count))).subscribe((data: any) => {
      this.userGitRepoData = data.slice(0, 5);
      this.spinner.hide();
    }, (exception: any) => {
      this.spinner.hide();
      this.setAlert(exception.statusText);
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

  setAlert(message) {
    this.simpleAlert.create({
      title: 'Information',
      message: message,
    });
  }


}
