import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalStaffDashboardComponent } from './hospital-staff-dashboard.component';

describe('HospitalStaffDashboardComponent', () => {
  let component: HospitalStaffDashboardComponent;
  let fixture: ComponentFixture<HospitalStaffDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalStaffDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
