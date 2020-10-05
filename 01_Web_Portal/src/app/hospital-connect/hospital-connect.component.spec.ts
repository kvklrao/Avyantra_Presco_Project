import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalConnectComponent } from './hospital-connect.component';

describe('HospitalConnectComponent', () => {
  let component: HospitalConnectComponent;
  let fixture: ComponentFixture<HospitalConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
