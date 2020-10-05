import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {NgxMaskModule} from 'ngx-mask';
import { ToastrModule } from "ngx-toastr";
import { AppHelper } from '../shared/helper/app.helper';
import {NgxPaginationModule} from 'ngx-pagination';
import { MedicalRecordsComponent } from './medical-records.component';
import { userTypePipe } from '../shared/pipes/user-type.pipe';

describe('MedicalRecordsComponent', () => {
  let component: MedicalRecordsComponent;
  let fixture: ComponentFixture<MedicalRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalRecordsComponent, userTypePipe ],
      imports: [
        FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot(),
        HttpClientModule,
        NgxPaginationModule,
        ToastrModule.forRoot()],
      providers:[AppHelper]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordsComponent);
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
    expect(component.addMedicalRecordForm.valid).toBeFalsy();
  });

  // Field level validity
  it('BMRN field validity', () => {
    let errors = {};
    let bmrn =component.addMedicalRecordForm.controls['bmrn'];
    expect(bmrn.valid).toBeFalsy();

    // BMRN field is required
    errors = bmrn.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set bmrn to something
    bmrn.setValue('test');
    errors = bmrn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(bmrn.errors).toBeFalsy();
  });

  it('MMRN field validity', () => {
    let errors = {};
    let mmrn =component.addMedicalRecordForm.controls['mmrn'];
    expect(mmrn.valid).toBeFalsy();

    // MMRN field is required
    errors = mmrn.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set mmrn to something
    mmrn.setValue('test');
    errors = mmrn.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(mmrn.errors).toBeFalsy();
  });

  it('Baby Name field validity', () => {
    let errors = {};
    let babyName =component.addMedicalRecordForm.controls['babyName'];

    // babyName field is required
    babyName.setValue('testtttttttttttttttttttttttttttttttttttttttttttttttt');
    errors = babyName.errors || {};
    expect(errors['maxlength']).toBeTruthy();

    // Set babyName to something
    babyName.setValue('test');
    errors = babyName.errors || {};
    expect(errors['maxlength']).toBeFalsy();
    expect(babyName.errors).toBeFalsy();
  });

});
