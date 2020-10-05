import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessetPasswordComponent } from './resset-password.component';

describe('RessetPasswordComponent', () => {
  let component: RessetPasswordComponent;
  let fixture: ComponentFixture<RessetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
