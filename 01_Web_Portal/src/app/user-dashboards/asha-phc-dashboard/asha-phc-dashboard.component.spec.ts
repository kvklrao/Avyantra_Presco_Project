import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshaPhcDashboardComponent } from './asha-phc-dashboard.component';

describe('AshaPhcDashboardComponent', () => {
  let component: AshaPhcDashboardComponent;
  let fixture: ComponentFixture<AshaPhcDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AshaPhcDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshaPhcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
