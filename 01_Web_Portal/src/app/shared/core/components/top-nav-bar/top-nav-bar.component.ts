import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { ReadingDataService } from 'src/app/shared/service/reading-data.service';
import { AppConstant } from 'src/app/shared/constant/app-constant';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute, public dataService:DataService,public readingDataService:ReadingDataService,private constant:AppConstant) { }
  selectedTab:string;
  hospitalName:string;
  loginHospital:any={};
  loggedUserName:string;
  staffUser=["DashboardStaff","MessageCenter","MyProfile"];
  ReferralUser=["DashboardRD","MyProfile","hospitalConnect","MessageCenter"];
  branchAdmin=["Dashboard","MedicalRecords","HospitalStaff","Settings","MessageCenter","MyProfile"];
  hospitalAdmin=["Dashboard","MedicalRecords","HospitalStaff","Settings","MessageCenter","MyProfile","AddBranch"];
  ashaPhc=["DashboardAsha","dataEntry"];
  ngOnInit() {

    this.selectedTab='dashboard';
    this.selectedTab = this.route.children[0].url['value'][0].path;
    if(this.selectedTab == 'staff-profile' || this.selectedTab == 'referral-profile' || this.selectedTab == 'my-profile' || this.selectedTab == 'branch-admin-profile') {
      this.selectedTab = 'my-profile';
    }
 
    this.loginHospital=JSON.parse(localStorage.getItem("login_hospital"));
    this.getLoggedInUserName();
  }

  getLoggedInUserName(){
    if(this.loginHospital['user_type']===this.constant.referral_doctor_login || this.loginHospital['user_type']===this.constant.staff_type_login ){
      this.loggedUserName=this.loginHospital['first_name'] + ' '+this.loginHospital['last_name'];
    }
    if(this.loginHospital['user_type']===this.constant.branch_type_login ){
      this.loggedUserName=this.loginHospital['hospital_branch_name'];
    }
    if(this.loginHospital['user_type']===this.constant.hospital_type_login ){
      this.loggedUserName=this.loginHospital['hospital_name'];
    }
    if(this.loginHospital['user_type']==this.constant.asha_worker){
      this.loggedUserName=this.loginHospital['username'];
      if(this.selectedTab=='baby-profile')
        this.selectedTab="data-entry";
    }
    if(this.loginHospital['user_type']==this.constant.phc_worker){
      this.loggedUserName=this.loginHospital['username'];
      if(this.selectedTab=='baby-profile')
        this.selectedTab="data-entry";
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
    this.dataService.clearOption();
    this.readingDataService.isMotherProfileHaveResp = true;
    this.readingDataService.clearReadingFormData();
    this.readingDataService.reset();
    this.readingDataService.resetAshaWorker();
    this.readingDataService.resetAll();
  }

  changeProfile(){
    if(this.loginHospital['user_type']==this.constant.staff_type_login){
      this.router.navigate(["admin/staff-profile"]);
    }
    if(this.loginHospital['user_type']==this.constant.hospital_type_login){
      this.router.navigate(["admin/my-profile"]);
    }
    if(this.loginHospital['user_type']==this.constant.branch_type_login){
      this.router.navigate(["admin/branch-admin-profile"]);
    }
    if(this.loginHospital['user_type']===this.constant.referral_doctor_login){
      this.router.navigate(["admin/referral-profile"]);
    }
    
  }

  activeTab(tabName){
    this.selectedTab=tabName;
    if(tabName=='data-entry'){
      this.readingDataService.reset();
    }
  }

  showPermission(tabName){
    if(this.loginHospital['user_type']==this.constant.hospital_type_login){
        return this.hospitalAdmin.includes(tabName);
    }
    if(this.loginHospital['user_type']==this.constant.branch_type_login){
      return this.branchAdmin.includes(tabName);
    }
    if(this.loginHospital['user_type']==this.constant.staff_type_login){
      return this.staffUser.includes(tabName);
    }
    if(this.loginHospital['user_type']==this.constant.referral_doctor_login){
      return this.ReferralUser.includes(tabName);
    }
    if(this.loginHospital['user_type']==this.constant.asha_worker || this.loginHospital['user_type']==this.constant.phc_worker){
      return this.ashaPhc.includes(tabName);
    }
  }

  goDataAshaPhcForm(){
    this.selectedTab="data-entry";
    this.readingDataService.ashaPhcScore=false;
    //this.router.navigate(['/dashboard']);
  }

}
