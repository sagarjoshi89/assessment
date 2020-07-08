import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './shared/component/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { UserGitRepoDetailComponent } from './user/user-detail/user-git-repo-detail.component';
import { ApiService } from './shared/service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserGitRepoDetailComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
