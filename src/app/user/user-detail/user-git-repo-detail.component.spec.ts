import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGitRepoDetailComponent } from './user-git-repo-detail.component';

describe('UsersDetailComponent', () => {
  let component: UserGitRepoDetailComponent;
  let fixture: ComponentFixture<UserGitRepoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGitRepoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGitRepoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
