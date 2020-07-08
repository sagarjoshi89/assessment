import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/shared/component/user-profile/user-profile';
import { GitRepo } from './user-git-repo-detail';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-git-repo-detail.component.html',
  styleUrls: ['./user-git-repo-detail.component.css']
})
export class UserGitRepoDetailComponent implements OnInit {

  @Input() userGitRepoData:GitRepo[];
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    console.log("User Git : ",changes);
    if (changes['userGitRepoData']) {
      console.log("User Git 1: ",changes['userGitRepoData'].currentValue);
      this.userGitRepoData = changes['userGitRepoData'].currentValue;
      console.log("User Git 2: ",this.userGitRepoData);
        //this.groupPosts = this.groupByCategory(this.data);
    }
}

}
