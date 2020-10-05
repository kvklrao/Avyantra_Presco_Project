import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshaSignupComponent } from './asha-signup.component';

describe('AshaSignupComponent', () => {
  let component: AshaSignupComponent;
  let fixture: ComponentFixture<AshaSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AshaSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshaSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
