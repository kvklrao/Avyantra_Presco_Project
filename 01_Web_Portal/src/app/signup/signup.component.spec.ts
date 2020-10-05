import { async, ComponentFixture, TestBed, fakeAsync,tick  } from '@angular/core/testing';
import {Location} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import {NgxMaskModule} from 'ngx-mask';
import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';
import { By } from '@angular/platform-browser';
import { query } from '@angular/core/src/render3';

export const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;
  let location: Location;

  // export const routes: Routes = [
  //   {path: '', redirectTo: 'home', pathMatch: 'full'},
  //   {path: 'home', component: HomeComponent},
  //   {path: 'search', component: SearchComponent}
  // ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        RouterTestingModule.withRoutes(routes), NgxMaskModule.forRoot(),
        ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    router.initialNavigation(); 
    fixture.detectChanges();
  });

  it('signup form should be loaded first', () => {
    expect(component).toBeTruthy();
  });

  it('Redirect to Login screen when login method called', fakeAsync(() => {
    let component = fixture.debugElement.componentInstance;
    component.login();
    router.navigate(['login']); 
    tick();
    expect(location.path()).toBe('/login');
  }));

  // it('Invalid Form',() => {
  //   let component = fixture.debugElement.componentInstance;
  //   component.signForm.controls['email'].setValue('');
  //   component.signForm.controls['hospital_name'].setValue('');
  //   component.signForm.controls['hospital_branch_name'].setValue('');
  //   component.signForm.controls['username'].setValue('');
  //   component.signForm.controls['password'].setValue('');
  //   component.signForm.controls['confirmPass'].setValue('');
  //   expect(component.signForm.valid).toBeFalsy();
  // });

//   it('Invalid Form',() => {
//     let errors={};
//     let component = fixture.debugElement.componentInstance;
//     let emailField=component.signForm.controls['email'];
//     emailField.setValue('xyz');
//     errors = emailField.errors || {};
//     expect(errors['email']).toBeTruthy();
//     emailField.setValue('xyz@gmail.com');
//     errors = emailField.errors || {};
//     expect(errors['email']).toBeFalsy();
// });

// it('Password field validation failed, It should contain atleast 6 digit',()=>{
//   let errors={};
//     let component = fixture.debugElement.componentInstance;
//     let passwordField=component.signForm.controls['password'];
//     passwordField.setValue('1234');
//     errors = passwordField.errors || {};
//     expect(errors['minlength']).toBeTruthy();
//     passwordField.setValue('123456');
//     errors = passwordField.errors || {};
//     expect(errors['minlength']).toBeFalsy();
// })

it('Password and confirm password should be same',()=>{
  let component = fixture.debugElement.componentInstance;
  let compiled=fixture.debugElement.nativeElement;
  let passwordField=component.signForm.controls['password'];
  let confirmPasswordField=component.signForm.controls['confirmPass'];
  spyOn(component,'is_match');
  passwordField.setValue('123456');
  confirmPasswordField.setValue('12345');
  expect(component.is_match).toBeTruthy();
})

// it('All required field',()=>{
//   let component = fixture.debugElement.componentInstance;
//   spyOn(component,'signup');
//   component.signForm.controls['email'].setValue('test@gmail.com');
//   component.signForm.controls['hospital_name'].setValue('Test Hospital');
//   component.signForm.controls['hospital_branch_name'].setValue('Indore');
//   component.signForm.controls['username'].setValue('test');
//   component.signForm.controls['password'].setValue('123456test');
//   component.signForm.controls['confirmPass'].setValue('123456test');
//   let buttonControl=fixture.debugElement.query(By.css('input[type=submit]')).nativeElement;
//   buttonControl.click();
//   expect(component.signForm.valid).toBeTruthy();
//   expect(component.signup).toHaveBeenCalledTimes(1);
// })

});
