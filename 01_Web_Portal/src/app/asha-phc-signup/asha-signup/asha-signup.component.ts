import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/service/login.service';
import { Common } from 'src/app/shared/service/common/common';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { CommonService } from 'src/app/shared/service/common/common.service';

@Component({
  selector: 'app-asha-signup',
  templateUrl: './asha-signup.component.html',
  styleUrls: ['./asha-signup.component.css']
})
export class AshaSignupComponent implements OnInit {

  signForm: FormGroup;
  submitted = false;
  already_exist_status = 422;
  success_status = 200;
  doNotAutoComplete:any={};

  password = "password";
  is_toggle = false;
  password_class = "fa fa-eye-slash";

  public customPatterns = { 'A': { pattern: new RegExp('\[a-zA-Z0-9_*!@#$%&\]') } };
  public onlyCharWithSpace = { 'S': { pattern: new RegExp('\[a-zA-Z, \]') } };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private commonService: CommonService,
    private commonAsyn: Common,private helper:AppHelper
  ) { }

  ngOnInit() {
    this.commonAsyn.isHide();
    this.signForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email,Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
      username: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      hospitalType:["",[Validators.required]]
    });
  }

  login(){
    const vim = this;
    vim.router.navigate(["/login"]);  
  }

  signup(){
    if(this.signForm.invalid){
      this.submitted=true;
      return;
    }else{
        this.commonService.ashaPhcSignup(this.signForm['value']).subscribe(result=>{
          if(this.helper.success(result)){
            this.toastr.success('',result['message']);
            this.router.navigate(["/login"]);
          }else{
            this.helper.errorHandler(result);
          }
        })
    }
  }

  show_password() {
    if (this.is_toggle) {
      this.is_toggle = false;
      this.password = "password";
      this.password_class = "fa fa-eye-slash";
    } else {
      this.is_toggle = true;
      this.password = "text";
      this.password_class = "fa fa-eye";
    }
  }

}
