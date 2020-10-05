import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AppHelper } from '../shared/helper/app.helper';
import {NgxMaskModule} from 'ngx-mask';
import { MyProfileComponent } from './my-profile.component';
import { passwordPipe } from '../shared/pipes/encrypt-password.pipe';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileComponent ,passwordPipe],
      imports:[ReactiveFormsModule,FormsModule, HttpClientModule, NgxMaskModule.forRoot(),
        ToastrModule.forRoot()],
      providers:[AppHelper]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
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
    localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
    expect(component).toBeTruthy();
  });
 
  it('form validation failed', () => {
    let component=fixture.debugElement.componentInstance;
    component.myProfileForm['value']['email_address']="testdemo";
    component.myProfileForm['value']['hospital_id']=92;
    component.myProfileForm['value']['hospital_name']="test";
    component.myProfileForm['value']['user_name']="testuser";
    component.myProfileForm['value']['password']="123456";
    component.myProfileForm['value']['user_id']=486;
    expect(component.myProfileForm.valid).toBeFalsy();
  });

  // it('form validation pass', () => {
  //   let component=fixture.debugElement.componentInstance;
  //   component.myProfileForm['value']['email_address']="testdemo@gmail.com";
  //   component.myProfileForm['value']['hospital_id']=92;
  //   component.myProfileForm['value']['hospital_name']="test";
  //   component.myProfileForm['value']['user_name']="testuser";
  //   component.myProfileForm['value']['password']="123456";
  //   component.myProfileForm['value']['user_id']=486;
  //   expect(component.myProfileForm.valid).toBeTruthy();
  // });

  it('email validations',()=>{
    let component=fixture.debugElement.componentInstance;
    let errors={};
    let email=component.myProfileForm.controls['email_address'];
    email.setValue('testDemogmail.com');
    errors=email.errors||{};
    expect(errors['email']).toBeTruthy();
  })

  it('user name validations',()=>{
    let errors={};
    let username=component.myProfileForm.controls['user_name'];
    username.setValue('test');
    errors=username.errors||{};
    expect(errors['minlength']).toBeTruthy();
    username.setValue('test123');
    errors=username.errors||{};
    expect(errors['minlength']).toBeFalsy();
  })

  it('password validations',()=>{
    let errors={};
    let password=component.myProfileForm.controls['password'];
    password.setValue('test');
    errors=password.errors||{};
    expect(errors['minlength']).toBeTruthy();
    password.setValue('test123');
    errors=password.errors||{};
    expect(errors['minlength']).toBeFalsy();
  })

  it('hospital name validations',()=>{
    let errors={};
    let hospital_name=component.myProfileForm.controls['hospital_name'];
    hospital_name.setValue('testffffffffffffffffffffffffffffffffffffffff');
    errors=hospital_name.errors||{};
    expect(errors['maxlength']).toBeTruthy();
    hospital_name.setValue('testhospital');
    errors=hospital_name.errors||{};
    expect(errors['minlength']).toBeFalsy();
  })
});
