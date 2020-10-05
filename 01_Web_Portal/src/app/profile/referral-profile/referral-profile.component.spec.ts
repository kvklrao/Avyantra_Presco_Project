import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralProfileComponent } from './referral-profile.component';

describe('ReferralProfileComponent', () => {
  let component: ReferralProfileComponent;
  let fixture: ComponentFixture<ReferralProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
