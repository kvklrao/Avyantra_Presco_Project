import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthParametersComponent } from './health-parameters.component';

describe('HealthParametersComponent', () => {
  let component: HealthParametersComponent;
  let fixture: ComponentFixture<HealthParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
