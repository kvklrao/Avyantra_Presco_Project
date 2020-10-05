import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import {NgxMaskModule} from 'ngx-mask'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FinalComponent } from './final.component';
import { DataService } from '../../shared/service/data.service';
import { GeneralComponent } from '../general/general.component';

export const routes: Routes = [
  {
    path: '',
    component: FinalComponent
  },
  {
    path: 'dashboard/baby-profile',
    component: GeneralComponent
  }
];

describe('FinalComponent', () => {
  let component: FinalComponent;
  let fixture: ComponentFixture<FinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalComponent, GeneralComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot(),
        BsDatepickerModule.forRoot()],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalComponent);
    component = fixture.componentInstance;
    let store = {};
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"test":"test"});
    });
     spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return store[key]=value;
      });
    fixture.detectChanges();
  });

  it('should create', () => {
    localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92}))
    expect(component).toBeTruthy();
  });
});
