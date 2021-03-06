import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GitRepo } from './user-git-repo-detail';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-git-repo-detail.component.html',
  styleUrls: ['./user-git-repo-detail.component.css']
})
export class UserGitRepoDetailComponent implements OnChanges {

  @Input() userGitRepoData: GitRepo[];
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userGitRepoData']) {
      this.userGitRepoData = changes['userGitRepoData'].currentValue;
    }
  }

}
