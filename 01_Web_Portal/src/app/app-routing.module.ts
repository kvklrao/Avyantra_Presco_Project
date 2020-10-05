import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BabyCnsComponent } from './dashboard/baby-cns/baby-cns.component';
import { GeneralComponent } from './dashboard/general/general.component';
import { MaternalComponent } from './dashboard/maternal/maternal.component';
import { BabyAppearComponent } from './dashboard/baby-appear/baby-appear.component';
import { BabyRespComponent } from './dashboard/baby-resp/baby-resp.component';
import { BabyCvComponent } from './dashboard/baby-cv/baby-cv.component';
import { BabyGitComponent } from './dashboard/baby-git/baby-git.component';
import { BabyInvestigationComponent } from './dashboard/baby-investigation/baby-investigation.component';
import { AntibioticAdministrationComponent } from './dashboard/antibiotic-administration/antibiotic-administration.component';
import { FinalComponent } from './dashboard/final/final.component';
import { HospitalAdminComponent } from './user-dashboards/hospital-admin/hospital-admin.component';
import { HospitalAdminInfoComponent } from './user-dashboards/hospital-admin/hospital-admin-info/hospital-admin-info.component';
import { HospitalBranchComponent } from './hospital-branch/hospital-branch.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HospitalStaffComponent } from './hospital-staff/hospital-staff.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReferralDoctorStaffComponent } from './referral-doctor-staff/referral-doctor-staff.component';
import { HospitalStaffDashboardComponent } from './user-dashboards/hospital-staff-dashboard/hospital-staff-dashboard.component';
import { StaffProfileComponent } from './profile/staff-profile/staff-profile.component';
import { ReferralProfileComponent } from './profile/referral-profile/referral-profile.component';
import { BranchAdminProfileComponent } from './profile/branch-admin-profile/branch-admin-profile.component';
import { ReferralDoctorComponent } from './user-dashboards/referral-doctor/referral-doctor.component';
import { HospitalConnectComponent } from './hospital-connect/hospital-connect.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { ScoreAnalysisComponent } from './score-analysis/score-analysis.component';
import { RessetPasswordComponent } from './resset-password/resset-password.component';
import { AshaPhcDashboardComponent } from './user-dashboards/asha-phc-dashboard/asha-phc-dashboard.component';
import { HealthParametersComponent } from './dashboard/health-parameters/health-parameters.component';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  // {
  //   path: 'dashboard', component: DashboardComponent,
  //   children: [
  //     {path: '', redirectTo: 'baby-profile', pathMatch: 'prefix'},
  //     {path: 'baby-profile', component: GeneralComponent},
  //     {path: 'mother-profile', component: MaternalComponent},
  //     {path: 'baby-appearence', component: BabyAppearComponent},
  //     {path: 'baby-respiratory', component: BabyRespComponent},
  //     {path: 'baby-cardio-vascular', component: BabyCvComponent},
  //     {path: 'baby-cns', component: BabyCnsComponent},
  //     {path: 'baby-gi-tract', component: BabyGitComponent},
  //     {path: 'baby-investigation', component: BabyInvestigationComponent},
  //     {path: 'anitibiotic-administration', component: AntibioticAdministrationComponent},
  //     {path: 'final-diagnosis', component: FinalComponent},
  //   ]
  // }
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'baby-profile', pathMatch: 'prefix'},
      {path: 'baby-profile', component: GeneralComponent,canActivate: [AuthGuard]},
      {path: 'mother-profile', component: MaternalComponent,canActivate: [AuthGuard]},
      {path: 'baby-appearence', component: BabyAppearComponent,canActivate: [AuthGuard]},
      {path: 'baby-respiratory', component: BabyRespComponent,canActivate: [AuthGuard]},
      {path: 'baby-cardio-vascular', component: BabyCvComponent,canActivate: [AuthGuard]},
      {path: 'baby-cns', component: BabyCnsComponent,canActivate: [AuthGuard]},
      {path: 'baby-gi-tract', component: BabyGitComponent,canActivate: [AuthGuard]},
      {path: 'baby-investigation', component: BabyInvestigationComponent,canActivate: [AuthGuard]},
      {path: 'anitibiotic-administration', component: AntibioticAdministrationComponent,canActivate: [AuthGuard]},
      {path: 'final-diagnosis', component: FinalComponent,canActivate: [AuthGuard]},
      {path: 'health-parameters', component: HealthParametersComponent,canActivate: [AuthGuard]},
    ],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'admin', component: HospitalAdminComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix',canActivate: [AuthGuard]},
      {path: 'dashboard', component: HospitalAdminInfoComponent,canActivate: [AuthGuard]},
      {path:'addbranch',component:HospitalBranchComponent,canActivate: [AuthGuard]},
      {path:'setting',component:SettingsComponent,canActivate: [AuthGuard]},
      {path:'staff',component:HospitalStaffComponent,canActivate: [AuthGuard]},
      {path:'medical-records', component:MedicalRecordsComponent,canActivate: [AuthGuard]},
      {path:'my-profile', component:MyProfileComponent,canActivate: [AuthGuard]},
      {path:'staff-profile', component:StaffProfileComponent,canActivate: [AuthGuard]},
      {path:'referral-profile', component:ReferralProfileComponent,canActivate: [AuthGuard]},
      {path:'branch-admin-profile', component:BranchAdminProfileComponent,canActivate: [AuthGuard]},
      {path:'referral-doctor', component:ReferralDoctorStaffComponent,canActivate: [AuthGuard]},
      {path:'hospital-staff', component:HospitalStaffDashboardComponent,canActivate: [AuthGuard]},
      {path:'referral-doctors', component:ReferralDoctorComponent,canActivate: [AuthGuard]},
      {path:'hospital-connect', component:HospitalConnectComponent,canActivate: [AuthGuard]},
      {path:'message-center', component:MessageCenterComponent,canActivate: [AuthGuard]},
      {path:'score-analysis/:babyMrNo/:studyId/:reading', component:ScoreAnalysisComponent,canActivate: [AuthGuard]},
      {path:'asha-phc', component:AshaPhcDashboardComponent,canActivate: [AuthGuard]},
    ],
  },
  {
    path: 'reset_password/:passcode',
    component: RessetPasswordComponent
  },
  {
    path: 'forget_password',
    loadChildren: './forget/forget.module#ForgetModule'
  },
  {
    path: 'referral-signup',loadChildren: './referral-signup/referral-signup.module#RefferalSignupModule'
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  {
    path: '',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'asha-phc-signup',
    loadChildren: './asha-phc-signup/asha-phc-signup.module#AshaPhcSignupModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true ,onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
