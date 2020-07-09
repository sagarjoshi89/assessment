import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './shared/component/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { UserGitRepoDetailComponent } from './user/user-detail/user-git-repo-detail.component';
import { ApiService } from './shared/service/api.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDialogsModule } from 'ngx-dialogs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UserGitRepoDetailComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxDialogsModule,
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
