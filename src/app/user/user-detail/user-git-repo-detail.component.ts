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
    if (changes['userGitRepoData']) {
      this.userGitRepoData = changes['userGitRepoData'].currentValue;
    }
}

}
