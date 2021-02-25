import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferralSignupComponent } from './referral-signup.component';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { LoginService } from '../shared/service/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { AppHelper } from '../shared/helper/app.helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('ReferralSignupComponent', () => {
  let component: ReferralSignupComponent;
  let fixture: ComponentFixture<ReferralSignupComponent>;
  let router: Router;
  let env: string;
  let httpTestingController: HttpTestingController;

  let routs: Routes = [
    {
      path: 'login',
      component: LoginComponent
    }
  ]



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralSignupComponent, LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        RouterTestingModule.withRoutes(routs),
        ToastrModule.forRoot(),
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoginService,AppHelper
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralSignupComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    router.initialNavigation();
    httpTestingController = TestBed.get(HttpTestingController);
    env = environment.server_url;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  ///validation

  it("address field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.address.invalid;
    expect(isInvalid).toBeTruthy();

    signupRefForm.controls.address.setValue("test!!");
    expect(signupRefForm.controls.address.valid).toBeTruthy();

  });

  it("city field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.city.invalid;
    expect(isInvalid).toBeTruthy();

    signupRefForm.controls.city.setValue("test!!");
    expect(signupRefForm.controls.city.valid).toBeTruthy();

    signupRefForm.controls.city.setValue("this is max length 32 validation testing xyz");
    expect(signupRefForm.controls.city.valid).toBeFalsy();

  });

  it("contactNumber field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.contactNumber.invalid;
    expect(isInvalid).toBeTruthy();

    signupRefForm.controls.contactNumber.setValue(1234567890);
    expect(signupRefForm.controls.contactNumber.valid).toBeTruthy();

    signupRefForm.controls.contactNumber.setValue(12345);
    expect(signupRefForm.controls.contactNumber.valid).toBeFalsy();

  });

  it("email field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.email.invalid;
    expect(isInvalid).toBeTruthy();

    signupRefForm.controls.email.setValue("test@ad101.com");
    expect(signupRefForm.controls.email.valid).toBeTruthy();

    signupRefForm.controls.email.setValue("wrong email");
    expect(signupRefForm.controls.email.valid).toBeFalsy();

  });

  it("firstName field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.firstName.invalid;
    expect(isInvalid).toBeTruthy();

    signupRefForm.controls.firstName.setValue("test!!");
    expect(signupRefForm.controls.firstName.valid).toBeTruthy();

    signupRefForm.controls.firstName.setValue("12345");
    expect(signupRefForm.controls.firstName.valid).toBeFalsy();

    signupRefForm.controls.firstName.setValue("max length 15 testing");
    expect(signupRefForm.controls.firstName.valid).toBeFalsy();

  });

  it("lastName field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.lastName.invalid;
    expect(isInvalid).toBeTruthy();
    signupRefForm.controls.lastName.setValue("test!!");
    expect(signupRefForm.controls.lastName.valid).toBeTruthy();

    signupRefForm.controls.lastName.setValue("12345");
    expect(signupRefForm.controls.lastName.valid).toBeFalsy();

    signupRefForm.controls.lastName.setValue("max length 15 testing");
    expect(signupRefForm.controls.lastName.valid).toBeFalsy();

  });

  it("password field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.password.invalid;
    expect(isInvalid).toBeTruthy();
    signupRefForm.controls.password.setValue("test!!");
    let isValid = signupRefForm.controls.password.valid;
    expect(isValid).toBeTruthy();

  });

  it("state field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.state.invalid;
    expect(isInvalid).toBeTruthy();
    signupRefForm.controls.state.setValue("test!!");
    expect(signupRefForm.controls.state.valid).toBeTruthy();

    signupRefForm.controls.state.setValue("this is max length 32 validation testing xyz");
    expect(signupRefForm.controls.state.valid).toBeFalsy();

  });

  it("userName field validation", () => {
    let signupRefForm = component.signupReferralForm;
    let isInvalid = signupRefForm.controls.userName.invalid;
    expect(isInvalid).toBeTruthy();
    signupRefForm.controls.userName.setValue("test!!");
    expect(signupRefForm.controls.userName.valid).toBeTruthy();

    signupRefForm.controls.userName.setValue("minl6");
    expect(signupRefForm.controls.userName.valid).toBeFalsy();

  });

  ///btn testing

  // it("Sign Up button validation", () => {
  //   let signupRefForm = component.signupReferralForm;
  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({ //all valid
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeTruthy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city test city test city test city test city", //invalid
  //     contactNumber: "string number",
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "abcdefgh",//invalid
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test", //invalid
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test@ad101.com",
  //     firstName: "testFname testFname testFname", //invalid
  //     lastName: "testLname testLname testLname", //invalid
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123", //invalid
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state test state test state test state test state test state", //invalid
  //     userName: "test@123",
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test", //invalid
  //   });

  //   expect(signupRefForm.valid).toBeFalsy();

  // });

  //Routing Test

  it("should rout from '/' to '/login'", fakeAsync(() => {
    component.login();
    tick();
    expect(router.url).toEqual('/login');
  }));

  //API Test

  // it("Sign Up Api should work", () => {
  //   let url = env + 'hospitalStaff/registerReferralDoctor';
  //   let ls = TestBed.get(LoginService);
  //   let signupRefForm = component.signupReferralForm;
  //   signupRefForm.setValue({
  //     address: "test address",
  //     city: "test city",
  //     contactNumber: "1234567890",
  //     email: "test@ad101.com",
  //     firstName: "testFname",
  //     lastName: "testLname",
  //     password: "1234567890",
  //     pincode: "123456",
  //     state: "test state",
  //     userName: "test@123",
  //   });

  //   let obsr: Observable<any> = ls.referral_signup(signupRefForm.value);
  //   obsr.subscribe((resData) => {
  //     console.log(resData);
  //     expect(resData).toEqual({'message':"ok"});

  //     spyOn(component, "createForm");
  //     component.success(resData, "signup");

  //     expect(component.createForm).toHaveBeenCalled();

  //   });

  //   let req = httpTestingController.expectOne(url);

  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toBe(signupRefForm.value);

  //   req.flush({'message':"ok"});
  // });
/////////////////////////////////////////////////////////
  it("success method called", () => {
    spyOn(component,'createForm')
    component.success({},'signup');
    expect(component.createForm).toHaveBeenCalled();
    expect(component.submitted).toBeFalsy();
  });

  it("login called", fakeAsync(() => {
    component.login();
    tick();
    expect(router.url).toEqual('/login');
  }));


  it('getReferralSpeciality has been called',()=>{
    let res = {
      response:{
        referral_count:101
      }
  }
      var spy = spyOn(component['common'],'getReferralSpeciality').and.returnValue(of(res));
      component.getReferralSpeciality()
      spy.calls.mostRecent().returnValue.subscribe(commonService=>{
          expect(commonService).toBe(res);
      }) 
  })

  it('getReferralSpeciality has been called',()=>{
    component.signup();
    expect(component.submitted).toBeTruthy();
  })

  
});
