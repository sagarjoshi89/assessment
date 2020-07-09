import { GitRepo } from 'src/app/user/user-detail/user-git-repo-detail';

export class User {
    userName: string;
    userLocation: string;
    userAvatarUrl: string;
    gitRepos?: GitRepo[];

    constructor(userName: string, userLocation: string, userAvatarUrl: string) {
        this.userName = userName;
        this.userLocation = userLocation;
        this.userAvatarUrl = userAvatarUrl;
    }
}