import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchedUserListComponent } from './serched-user-list.component';

describe('SerchedUserListComponent', () => {
  let component: SerchedUserListComponent;
  let fixture: ComponentFixture<SerchedUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerchedUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
