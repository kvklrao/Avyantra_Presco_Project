import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AshaSignupComponent } from './asha-signup/asha-signup.component';

const routes: Routes = [
  {
    path:"",component:AshaSignupComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AshaPhcSignupRoutingModule { }
