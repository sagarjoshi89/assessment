import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from './shared/service/api.service';
import { ConstantData } from './shared/constant-data';
import { map } from 'rxjs/operators';
import { GitRepo } from './user/user-detail/user-git-repo-detail';
import { User } from './shared/component/user-profile/user-profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ngxalert } from 'ngx-dialogs';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contrado-assignment';
  searchedUserName: string;
  profileForm: FormGroup;
  userProfileData: User = new User('-', '-', 'assets/img/avatar.png');
  userGitRepoData: GitRepo[];
  searchedUserList: string[] = [];
  simpleAlert: any = new Ngxalert;

  constructor(private fb: FormBuilder, private apiService: ApiService,
    private spinner: NgxSpinnerService, private userService: UserService) {

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

  retrieveUserData() {
    const userRetrieveUrl = ConstantData.getUserURL + this.searchedUserName;
    if (this.userService.isUserExists(this.searchedUserName)) {
      const storedUser = this.userService.getUserData(this.searchedUserName);
      this.userProfileData = new User(storedUser.userName, storedUser.userLocation, storedUser.userAvatarUrl);
      this.userGitRepoData = storedUser.gitRepos;
      this.spinner.hide();
      this.resetForm();
    } else {
      this.apiService.getData(userRetrieveUrl).subscribe((data: any) => {
        this.retrieveUserRepoData();
        this.setUserProfile(data);
        this.setUserSearchedList();
      }, (exception: any) => {
        this.spinner.hide();
        this.setAlert(exception.statusText);
      });
    }
  }

  retrieveUserRepoData() {
    const userRetrieveUrl = ConstantData.getUserRepoURL.replace('{username}', this.searchedUserName);
    this.apiService.getData(userRetrieveUrl).pipe(map((messages: GitRepo[]) => {
      messages.sort((a1: GitRepo, a2: GitRepo) => a2.stargazers_count - a1.stargazers_count);
      return messages.slice(0, 5);
    })).subscribe((data: any) => {
      this.userGitRepoData = data;
      this.spinner.hide();
      this.resetForm();
      this.storeData();
    }, (exception: any) => {
      this.spinner.hide();
      this.setAlert(exception.statusText);
    });
  }

  resetForm() {
    this.profileForm.reset();
  }

  setUserProfile(data: any) {
    this.userProfileData = new User(data.login, data.location, data.avatar_url);
  }

  storeData() {
    this.userProfileData.gitRepos = this.userGitRepoData;
    this.userService.setUserData(this.searchedUserName, this.userProfileData);
  }

  setUserSearchedList() {
    if (!this.searchedUserList.some(name => name === this.searchedUserName)) {
      this.searchedUserList.push(this.searchedUserName);
    }
  }

  setAlert(message) {
    this.simpleAlert.create({
      title: 'Information',
      message: message,
    });
  }


}
