import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HospitalAdminComponent } from './hospital-admin.component';
import { TopNavBarComponent} from '../../shared/core/components/top-nav-bar/top-nav-bar.component';
import { FooterComponent} from '../../shared/core/components/footer/footer.component';
import { AppRoutingModule } from "../../app-routing.module";
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { GeneralComponent } from 'src/app/dashboard/general/general.component';
import { BasicComponent } from 'src/app/dashboard/basic/basic.component';
import { SearchComponent } from 'src/app/dashboard/search/search.component';
import { LevelComponent } from 'src/app/dashboard/level/level.component';
import { MaternalComponent } from 'src/app/dashboard/maternal/maternal.component';
import { BabyAppearComponent } from 'src/app/dashboard/baby-appear/baby-appear.component';
import { BabyRespComponent } from 'src/app/dashboard/baby-resp/baby-resp.component';
import { BabyCvComponent } from 'src/app/dashboard/baby-cv/baby-cv.component';
import { BabyCnsComponent } from 'src/app/dashboard/baby-cns/baby-cns.component';
import { BabyGitComponent } from 'src/app/dashboard/baby-git/baby-git.component';
import { BabyInvestigationComponent } from 'src/app/dashboard/baby-investigation/baby-investigation.component';
import { FinalComponent } from 'src/app/dashboard/final/final.component';
import { UserInfoComponent } from 'src/app/dashboard/user-info/user-info.component';
import { DateLevelPipe } from 'src/app/shared/pipes/date-level.pipe';
import { AntibioticAdministrationComponent } from 'src/app/dashboard/antibiotic-administration/antibiotic-administration.component';
import { HospitalStaffComponent } from 'src/app/hospital-staff/hospital-staff.component';
import { ReferralDoctorComponent } from '../referral-doctor/referral-doctor.component';
import { HospitalAdminInfoComponent } from './hospital-admin-info/hospital-admin-info.component';
import { HospitalBranchComponent } from 'src/app/hospital-branch/hospital-branch.component';
import { SettingsComponent } from 'src/app/settings/settings.component';
import { MedicalRecordsComponent } from 'src/app/medical-records/medical-records.component';
import { MyProfileComponent } from 'src/app/my-profile/my-profile.component';
import { ReferralDoctorStaffComponent } from 'src/app/referral-doctor-staff/referral-doctor-staff.component';
//import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { ToastrModule } from 'ngx-toastr';
 import { HttpClientModule } from '@angular/common/http';
// import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { CommonModule } from '@angular/common';
 import { MatTabsModule, MatIconModule } from '@angular/material';
// import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
// import { ScrollingModule, ScrollDispatchModule } from '@angular/cdk/scrolling';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
 import { NgxSpinnerModule } from 'ngx-spinner';
 import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
 import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { Common } from 'src/app/shared/service/common/common';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/shared/service/data.service';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { userTypePipe } from '../../shared/pipes/user-type.pipe';
import { passwordPipe } from '../../shared/pipes/encrypt-password.pipe';
// import { AppConstant } from 'src/app/shared/constant/app-constant';
// import { AppComponent } from 'src/app/app.component';

describe('HospitalAdminComponent', () => {
  let component: HospitalAdminComponent;
  let fixture: ComponentFixture<HospitalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAdminComponent, DashboardComponent,
        BasicComponent,
        GeneralComponent,
        SearchComponent,
        LevelComponent,
        MaternalComponent,
        BabyAppearComponent,
        BabyRespComponent,
        BabyCvComponent,
        BabyCnsComponent,
        BabyGitComponent,
        BabyInvestigationComponent,
        FinalComponent,   
       UserInfoComponent,
        DateLevelPipe,
        AntibioticAdministrationComponent,
        TopNavBarComponent,
        HospitalAdminComponent,
        HospitalStaffComponent,
        ReferralDoctorComponent,
        FooterComponent,
        HospitalAdminInfoComponent,
        HospitalBranchComponent,
        SettingsComponent,
        MedicalRecordsComponent,
        MyProfileComponent,
        ReferralDoctorStaffComponent,
        userTypePipe,
        passwordPipe ],
        imports: [
          ReactiveFormsModule,
          AppRoutingModule,
          // BrowserAnimationsModule,
           ToastrModule.forRoot(),
           HttpClientModule,
          // PerfectScrollbarModule,
          FormsModule,
          // CommonModule,
           MatTabsModule,
          MatIconModule,
           HttpClientModule,
          ReactiveFormsModule,
          // NgbModalModule,
          // ScrollingModule,
          // InfiniteScrollModule,
          // ScrollDispatchModule,
           NgxSpinnerModule,
           AngularMultiSelectModule,
           BsDatepickerModule.forRoot(),
          NgxMaskModule.forRoot(),
           NgxPaginationModule
        ],
        providers: [
          CommonService,
          Common,
          CookieService,
          DataService,
          AppHelper
        ],
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(HospitalAdminComponent);
    component = fixture.componentInstance;
    let store = {};
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"test":"test"});
    });
     spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return store[key]=value;
      });
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
  //   expect(component).toBeTruthy();
  // });
});
