import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreAnalysisComponent } from './score-analysis.component';

describe('ScoreAnalysisComponent', () => {
  let component: ScoreAnalysisComponent;
  let fixture: ComponentFixture<ScoreAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
