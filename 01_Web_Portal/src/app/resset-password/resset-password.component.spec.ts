import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessetPasswordComponent } from './resset-password.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AppHelper } from '../shared/helper/app.helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RessetPasswordComponent', () => {
  let component: RessetPasswordComponent;
  let fixture: ComponentFixture<RessetPasswordComponent>;
  let router:Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessetPasswordComponent],
      imports:[FormsModule,ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientModule,BrowserAnimationsModule
      ],
      providers:[
        AppHelper
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('resetPassword method',()=>{
    component.resetPassword();
  });
  it('success method',()=>{
    component.success({},"apiType");
  });
});
