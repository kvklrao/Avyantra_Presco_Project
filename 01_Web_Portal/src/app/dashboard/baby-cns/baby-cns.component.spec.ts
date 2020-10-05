import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import { BabyCnsComponent } from './baby-cns.component';
import { DataService } from '../../shared/service/data.service';

export const routes: Routes = [
  {
    path: '',
    component: BabyCnsComponent
  }
];

describe('BabyCnsComponent', () => {
  let component: BabyCnsComponent;
  let fixture: ComponentFixture<BabyCnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyCnsComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot()],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyCnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
