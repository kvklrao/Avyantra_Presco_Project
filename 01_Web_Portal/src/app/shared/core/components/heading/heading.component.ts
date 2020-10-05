import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/shared/constant/app-constant';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  loginHospital:any={};
  loggedInUser="";
  constructor(private constant:AppConstant) { }

  ngOnInit() {
    this.loginHospital = JSON.parse(localStorage.getItem("login_hospital"));

    if(this.loginHospital['user_type']===this.constant.referral_doctor_login){
      this.loggedInUser="Referral Doctor";
    }
    if(this.loginHospital['user_type']===this.constant.branch_type_login ){
      this.loggedInUser="Branch";
    }
    if(this.loginHospital['user_type']===this.constant.hospital_type_login ){
      this.loggedInUser="Hospital";
    }
    if(this.loginHospital['user_type']===this.constant.staff_type_login){
      this.loggedInUser="Staff";
    }
  }

}
