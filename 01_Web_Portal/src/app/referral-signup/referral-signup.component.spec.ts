import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralSignupComponent } from './referral-signup.component';

describe('ReferralSignupComponent', () => {
  let component: ReferralSignupComponent;
  let fixture: ComponentFixture<ReferralSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
