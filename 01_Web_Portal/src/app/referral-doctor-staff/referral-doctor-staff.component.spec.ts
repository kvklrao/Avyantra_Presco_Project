import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import {NgxMaskModule} from 'ngx-mask';
import { ToastrModule } from "ngx-toastr";
import { AppHelper } from '../shared/helper/app.helper';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReferralDoctorStaffComponent } from './referral-doctor-staff.component';

export const routes: Routes = [
  {
    path: '',
    component: ReferralDoctorStaffComponent
  }
];

describe('ReferralDoctorStaffComponent', () => {
  let component: ReferralDoctorStaffComponent;
  let fixture: ComponentFixture<ReferralDoctorStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralDoctorStaffComponent ],
      imports: [
        FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot(),
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot()],
      providers:[AppHelper]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralDoctorStaffComponent);
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

  // When form is empty
  it('form invalid when empty', () => {
    expect(component.addReferralForm.valid).toBeFalsy();
  });

  // Field level validity
  it('firstname field validity', () => {
    let errors = {};
    let firstname = component.addReferralForm.controls['firstName'];
    errors = firstname.errors || {};
    expect(errors['required']).toBeTruthy();
    firstname.setValue('testfsdfdsfsfsdfsdfsdfsdfsdfsdfsdfsdf');
    errors = firstname.errors || {};
    expect(errors['maxlength']).toBeTruthy();
    firstname.setValue('test');
    errors = firstname.errors || {};
    expect(firstname.errors).toBeFalsy();
  });

  it('lastname field validity', () => {
    let errors = {};
    let lastname = component.addReferralForm.controls['lastName'];
    errors = lastname.errors || {};
    expect(errors['required']).toBeTruthy();
    lastname.setValue('testfsdfdsfsfsdfsdfsdfsdfsdfsdfsdfsdf');
    errors = lastname.errors || {};
    expect(errors['maxlength']).toBeTruthy();
    lastname.setValue('test');
    errors = lastname.errors || {};
    expect(lastname.errors).toBeFalsy();
  });

  it('speciality field validity', () => {
    let errors = {};
    let speciality =component.addReferralForm.controls['speciality'];
    errors = speciality.errors || {};
    expect(errors['required']).toBeTruthy();
    speciality.setValue('test');
    errors = speciality.errors || {};
    expect(speciality.errors).toBeFalsy();
  });

  it('contact number field validity', () => {
    let errors = {};
    let contactnumber = component.addReferralForm.controls['contactNumber'];
    errors = contactnumber.errors || {};
    expect(errors['required']).toBeTruthy();
    contactnumber.setValue('55555');
    errors = contactnumber.errors || {};
    expect(errors['minlength']).toBeTruthy();
    contactnumber.setValue('5555555555');
    errors = contactnumber.errors || {};
    expect(contactnumber.errors).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.addReferralForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue('test@gmail.com');
    expect(errors['required']).toBeFalsy();
    expect(email.errors).toBeFalsy();
  });

  it('address field validity', () => {
    let errors = {};
    let address =component.addReferralForm.controls['address'];
    errors = address.errors || {};
    expect(errors['required']).toBeTruthy();
    address.setValue('test');
    errors = address.errors || {};
    expect(address.errors).toBeFalsy();
  });

  it('city field validity', () => {
    let errors = {};
    let city = component.addReferralForm.controls['city'];
    errors = city.errors || {};
    expect(errors['required']).toBeTruthy();
    city.setValue('testfsdfdsfsfsdfsdfsdffdsfsdfsdfsdfsdfsdfsdfsdfsfsdfs');
    errors = city.errors || {};
    expect(errors['maxlength']).toBeTruthy();
    city.setValue('test');
    errors = city.errors || {};
    expect(city.errors).toBeFalsy();
  });

  it('state field validity', () => {
    let errors = {};
    let state = component.addReferralForm.controls['state'];
    errors = state.errors || {};
    expect(errors['required']).toBeTruthy();
    state.setValue('testfsdfdsfsfsdfsdffdsfsdfsdfsdfdsfsffdsfsdfsfsdfsdfs');
    errors = state.errors || {};
    expect(errors['maxlength']).toBeTruthy();
    state.setValue('test');
    errors = state.errors || {};
    expect(state.errors).toBeFalsy();
  });

  it('pincode field validity', () => {
    let errors = {};
    let pincode = component.addReferralForm.controls['pincode'];
    pincode.setValue('5555');
    errors = pincode.errors || {};
    expect(errors['minlength']).toBeTruthy();
    pincode.setValue('555555');
    errors = pincode.errors || {};
    expect(pincode.errors).toBeFalsy();
  });

  // Add referral doctor test case
  it('submitting a referral form', () => {
    expect(component.addReferralForm.valid).toBeFalsy();
    component.addReferralForm.controls['firstName'].setValue("test");
    component.addReferralForm.controls['lastName'].setValue("test");
    component.addReferralForm.controls['speciality'].setValue("test");
    component.addReferralForm.controls['contactNumber'].setValue("1234567890");
    component.addReferralForm.controls['email'].setValue("test@gmail.com");
    component.addReferralForm.controls['address'].setValue("test");
    component.addReferralForm.controls['city'].setValue("test");
    component.addReferralForm.controls['state'].setValue("test");
    component.addReferralForm.controls['pincode'].setValue("123456");
    expect(component.addReferralForm.valid).toBeTruthy();
  });

});
