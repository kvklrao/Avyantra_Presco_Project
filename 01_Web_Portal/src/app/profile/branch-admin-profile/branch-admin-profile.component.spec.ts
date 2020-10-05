import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAdminProfileComponent } from './branch-admin-profile.component';

describe('BranchAdminProfileComponent', () => {
  let component: BranchAdminProfileComponent;
  let fixture: ComponentFixture<BranchAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
