import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AshaPhcSignupRoutingModule } from './asha-phc-signup-routing.module';
import { AshaSignupComponent } from './asha-signup/asha-signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AshaSignupComponent],
  imports: [
    CommonModule,
    AshaPhcSignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ]
})
export class AshaPhcSignupModule { }
