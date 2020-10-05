import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/service/data.service';
import { ReadingDataService } from 'src/app/shared/service/reading-data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { Common } from 'src/app/shared/service/common/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-parameters',
  templateUrl: './health-parameters.component.html',
  styleUrls: ['./health-parameters.component.css']
})
export class HealthParametersComponent implements OnInit {
  formRef:any;
  healthParameters:FormGroup;
  isEditClicked=false;
  isBpArterial: boolean = true;
  isUpperLimb: boolean = true;
  isLowerLimb: boolean = true;
  isStools:boolean=true;
  login_hospital: any = {};
  responseArray = [];
  content:any;
  public dataServiceObj;
  public readingDataObj;
  loggedInUserId:number;
  @Input() id;
  @Input() hospital_id;
  readingFormObj:any={};
  getMedicalRecordNumber: string;
  submitted=false;
  isHealthParametersEdit=false;
  @ViewChild('saveReadingContent') saveReadingContent;
  constructor(private formBuilder:FormBuilder,public readingDataService:ReadingDataService,private dataService:DataService, 
    private modalService: NgbModal,private helper:AppHelper,
    private common_api:CommonService,private commonAsyn:Common,
    private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    debugger;
    const vim = this;
    vim.dataServiceObj = vim.dataService.getOption();
    // vim.readingDataObj=vim.readingDataService.getReadingFormData('baby_resp') ;
    vim.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    vim.loggedInUserId=vim.login_hospital['user_id'];
    vim.createForm(vim.dataServiceObj.study_id);
    vim.id = vim.dataServiceObj.study_id;
    vim.readingDataObj=vim.readingDataService.getAshaReadingFormData();
    if(vim.readingDataObj!=undefined){
      vim.getMedicalRecordNumber=vim.dataServiceObj.baby_medical_record_number;
      vim.updateForm(this.readingDataObj);
    }
    if ( vim.dataServiceObj != undefined && vim.dataServiceObj.study_id != undefined) {
      vim.getMedicalRecordNumber=vim.dataServiceObj.baby_medical_record_number;
      vim.getHealthParameters(vim.dataServiceObj.study_id);
  }

  //this.isHealthParametersEdit=true;
  }

  createForm(id) {
    const vim = this;
    vim.healthParameters = vim.formBuilder.group({
      study_id: id,
      baby_appearance: ["", Validators.required],
      baby_feeding_status: ["", Validators.required],
      breast_feeding_initiation: ["", Validators.required],
      baby_blood_pressure_mean_arterial_bp: ["", Validators.required],
      baby_blood_pressure_upper_limb: ["", Validators.required],
      baby_blood_pressure_lower_limb: ["", Validators.required],
      urine_output: ["", [Validators.required]],
      abdominal_dystension: ["", Validators.required],
      frequency_of_stools: ["", [Validators.required]],
      vomiting: ["", Validators.required],
      retraction: ["", Validators.required],
      fast_breathing: ["", Validators.required],
      baby_chest_indrawing: ["", Validators.required],
      baby_movement: ["", Validators.required]
    });
  }

  onInputChange(event) {
    var vim = this;
    var target = event.target || event.srcElement || event.currentTarget;
    if (target.name == 'Arterial_BP') {
      if (target.value == '2') {
        vim.isBpArterial = false;
        vim.healthParameters.patchValue({
          baby_blood_pressure_mean_arterial_bp: 'NA'
        })
        vim.healthParameters.value["baby_blood_pressure_mean_arterial_bp"] = 'NA';

        vim.healthParameters.controls["baby_blood_pressure_mean_arterial_bp"].clearValidators();
        vim.healthParameters.controls["baby_blood_pressure_mean_arterial_bp"].updateValueAndValidity();
      } else {
        vim.healthParameters.controls["baby_blood_pressure_mean_arterial_bp"].setValidators([Validators.required]);
        vim.healthParameters.controls["baby_blood_pressure_mean_arterial_bp"].updateValueAndValidity();
        vim.healthParameters.patchValue({
          baby_blood_pressure_mean_arterial_bp: ''
        })
        vim.isBpArterial = true;
      }
    }

    if (target.name == 'upper_limb') {
      if (target.value == '2') {
        vim.isUpperLimb = false;
        vim.healthParameters.patchValue({
          baby_blood_pressure_upper_limb: 'NA'
        })
        vim.healthParameters.value["baby_blood_pressure_upper_limb"] = 'NA';

        vim.healthParameters.controls["baby_blood_pressure_upper_limb"].clearValidators();
        vim.healthParameters.controls["baby_blood_pressure_upper_limb"].updateValueAndValidity();
      } else {
        vim.healthParameters.controls["baby_blood_pressure_upper_limb"].setValidators([Validators.required]);
        vim.healthParameters.controls["baby_blood_pressure_upper_limb"].updateValueAndValidity();
        vim.healthParameters.patchValue({
          baby_blood_pressure_upper_limb: ''
        })
        vim.isUpperLimb = true;
      }
    }

    if (target.name == 'lower_limb') {
      if (target.value == '2') {
        vim.isLowerLimb = false;
        vim.healthParameters.patchValue({
          baby_blood_pressure_lower_limb: 'NA'
        })
        vim.healthParameters.value["baby_blood_pressure_lower_limb"] = 'NA';

        vim.healthParameters.controls["baby_blood_pressure_lower_limb"].clearValidators();
        vim.healthParameters.controls["baby_blood_pressure_lower_limb"].updateValueAndValidity();
      } else {
        vim.healthParameters.controls["baby_blood_pressure_lower_limb"].setValidators([Validators.required]);
        vim.healthParameters.controls["baby_blood_pressure_lower_limb"].updateValueAndValidity();
        vim.healthParameters.patchValue({
          baby_blood_pressure_lower_limb: ''
        })
        vim.isLowerLimb = true;
      }
    }

    if (target.name == 'Frequency') {
      if (target.value == '2') {
        vim.isStools = false;
        vim.healthParameters.patchValue({
          frequency_of_stools: 'NA'
        })
        vim.healthParameters.value["frequency_of_stools"] = 'NA';

        vim.healthParameters.controls["frequency_of_stools"].clearValidators();
        vim.healthParameters.controls["frequency_of_stools"].updateValueAndValidity();
      } else {
        vim.isStools = true;
        vim.healthParameters.controls["frequency_of_stools"].setValidators([Validators.required]);
        vim.healthParameters.controls["frequency_of_stools"].updateValueAndValidity();
        vim.healthParameters.patchValue({
          frequency_of_stools: ''
        })


      }
    }
  }

  healthParametersSubmit(){
    debugger;
    if(this.healthParameters.invalid){
      this.submitted=true;
      return;
    }else{
      if (this.healthParameters.value["baby_blood_pressure_mean_arterial_bp"] == '') {
        this.healthParameters.value["baby_blood_pressure_mean_arterial_bp"] = 'NA';
      }
      if (this.healthParameters.value["baby_blood_pressure_upper_limb"] == '') {
        this.healthParameters.value["baby_blood_pressure_upper_limb"] = 'NA';
      }
      if (this.healthParameters.value["baby_blood_pressure_lower_limb"] == '') {
        this.healthParameters.value["baby_blood_pressure_lower_limb"] = 'NA';
      }
      if (this.healthParameters.value["frequency_of_stools"] == '') {
        this.healthParameters.value["frequency_of_stools"] = 'NA';
      }
      this.readingDataService.saveAshaReadingFormData(this.healthParameters['value']);
      this.readingFormObj=this.readingDataService.getAshaWorkerReadingForm();
      this.setDataPoints();
      if(this.ValidateAllForms()){
      this.openModal();
      }
    }
  }

  setDataPoints(){
    //baby-appear
    this.readingFormObj['baby_appears']['baby_appearance']=this.healthParameters['value']['baby_appearance'];
    this.readingFormObj['baby_appears']['baby_feeding_status']=this.healthParameters['value']['baby_feeding_status'];
    this.readingFormObj['baby_appears']['breast_feeding_initiation']=this.healthParameters['value']['breast_feeding_initiation'];
    this.readingFormObj['baby_appears']['study_id']=this.healthParameters['value']['study_id'];
    //baby-cv
    this.readingFormObj['baby_cv']['baby_blood_pressure_lower_limb']=this.healthParameters['value']['baby_blood_pressure_lower_limb'];
    this.readingFormObj['baby_cv']['baby_blood_pressure_upper_limb']=this.healthParameters['value']['baby_blood_pressure_upper_limb'];
    this.readingFormObj['baby_cv']['baby_blood_pressure_mean_arterial_bp']=this.healthParameters['value']['baby_blood_pressure_mean_arterial_bp'];
    this.readingFormObj['baby_cv']['urine_output']=this.healthParameters['value']['urine_output'];
    this.readingFormObj['baby_cv']['study_id']=this.healthParameters['value']['study_id'];
    //baby-git
    this.readingFormObj['baby_git']['abdominal_dystension']=this.healthParameters['value']['abdominal_dystension'];
    this.readingFormObj['baby_git']['baby_movement']=this.healthParameters['value']['baby_movement'];
    this.readingFormObj['baby_git']['vomiting']=this.healthParameters['value']['vomiting'];
    this.readingFormObj['baby_git']['frequency_of_stools']=this.healthParameters['value']['frequency_of_stools'];
    this.readingFormObj['baby_git']['study_id']=this.healthParameters['value']['study_id'];
    //baby-resp
    this.readingFormObj['baby_resp']['retraction']=this.healthParameters['value']['retraction'];
    this.readingFormObj['baby_resp']['fast_breathing']=this.healthParameters['value']['fast_breathing'];
    this.readingFormObj['baby_resp']['baby_chest_indrawing']=this.healthParameters['value']['baby_chest_indrawing'];
    this.readingFormObj['baby_resp']['study_id']=this.healthParameters['value']['study_id'];
    //baby-cns
    this.readingFormObj['baby_cns']['study_id']=this.healthParameters['value']['study_id'];
    //baby-investigation
    this.readingFormObj['baby_investigation']['study_id']=this.healthParameters['value']['study_id'];
    //baby-antibiotic
    this.readingFormObj['baby_antibiotic']['study_id']=this.healthParameters['value']['study_id'];
    //baby-final
    this.readingFormObj['baby_final']['study_id']=this.healthParameters['value']['study_id'];
  }

  openModal() {
    this.formRef = this.modalService.open(this.saveReadingContent, this.helper.ngbModalSmallOptions);
  }

  saveReading(){
   // this.close();
    this.commonAsyn.showLoader();
    let vim=this;
    const newUser = vim.common_api.create_new_reading(this.readingFormObj,this.loggedInUserId);
    newUser.subscribe(
      response => {
       if(response['status']!=200){
        vim.toastr.error('',response['message']);
        this.commonAsyn.isHide();
       }else{
         this.commonAsyn.isHide();
       vim.toastr.success('',response['message']);
      //  vim.readingDataService.clearReadingFormData();
      //  vim.readingDataService.reset();
      // this.readingDataService.showSaveReadingButton=true;
      vim.readingDataService.setActiveTab("baby-profile")
       vim.router.navigate(['dashboard/baby-profile']);
       vim.readingDataService.reading="R1";
       vim.readingDataService.clearAshaReadingFormData();
       vim.readingDataService.resetAshaWorker();
       vim.readingDataService.ashaPhcScore=true;
       vim.close();
      }
      },
      error => {
        console.error("errro", error);
      }
    );
  }

  getHealthParameters(studyId){
    this.common_api.getHealthParameters(studyId).subscribe(response=>{
      if(this.helper.success(response)){
        if(response['response'].length > 0){
            this.responseArray=response['response'];
            this.isHealthParametersEdit=false;
        }else{
            this.responseArray=[];
            this.isHealthParametersEdit=true;
        }
      }
    })

  }

  close(){
    this.formRef.close();
  }

  ValidateAllForms(){
    if(!this.readingDataService.getAshaFormStatus('babyProfile') || !this.readingDataService.getAshaFormStatus('motherProfile')){
      if(!this.readingDataService.getAshaFormStatus('babyProfile')){
      this.toastr.error ('Please fill BABY PROFILE form.','');
      }else{
        this.toastr.error ('Please fill MOTHER PROFILE form.','');
      }
      return false;
    }else{
      return true;
    }
  }

  onChanges(): void {
    this.healthParameters.statusChanges.subscribe(val => {
      if(val==='INVALID'){
          if(this.readingDataObj!=undefined){
            this.healthParameters.value["reading"] = "R1";
            this.saveAshaReadingFormData(this.healthParameters['value']);
          }
      }
      else{
        if(this.readingDataObj!=undefined){
          this.healthParameters.value["reading"] = "R1";
          this.saveAshaReadingFormData(this.healthParameters['value']);
        }
      }
    });
  }

  saveAshaReadingFormData(formObj){
      this.readingDataService.saveAshaReadingFormData(formObj);
  }

  updateForm(obj){
    this.isHealthParametersEdit=true;
    let vim=this;
    if (obj["baby_blood_pressure_mean_arterial_bp"] == 'NA') {
      vim.isBpArterial = false;
      vim.healthParameters.controls["baby_blood_pressure_mean_arterial_bp"].clearValidators();
      vim.healthParameters.controls["baby_blood_pressure_mean_arterial_bp"].updateValueAndValidity();
    } else {
      vim.isBpArterial = true;
    }

    if (obj["baby_blood_pressure_upper_limb"] == 'NA') {
      vim.isUpperLimb = false;
      vim.healthParameters.controls["baby_blood_pressure_upper_limb"].clearValidators();
      vim.healthParameters.controls["baby_blood_pressure_upper_limb"].updateValueAndValidity();
    } else {
      vim.isUpperLimb = true;
    }

    if (obj["baby_blood_pressure_lower_limb"] == 'NA') {
      vim.isLowerLimb = false;
      vim.healthParameters.controls["baby_blood_pressure_lower_limb"].clearValidators();
      vim.healthParameters.controls["baby_blood_pressure_lower_limb"].updateValueAndValidity();
    } else {
      vim.isLowerLimb = true;
    }
    if (obj["frequency_of_stools"] == 'NA') {
      vim.isStools = false;
      vim.healthParameters.controls["frequency_of_stools"].clearValidators();
      vim.healthParameters.controls["frequency_of_stools"].updateValueAndValidity();
    } else {
      vim.isStools = true;
      vim.healthParameters.controls["frequency_of_stools"].setValidators([Validators.required]);
      vim.healthParameters.controls["frequency_of_stools"].updateValueAndValidity();
    }
   
    vim.healthParameters.patchValue({
      baby_appearance: obj["baby_appearance"],
      baby_feeding_status:obj["baby_feeding_status"],
      breast_feeding_initiation: obj["breast_feeding_initiation"],
      baby_blood_pressure_mean_arterial_bp: obj["baby_blood_pressure_mean_arterial_bp"],
      baby_blood_pressure_upper_limb: obj["baby_blood_pressure_upper_limb"],
      baby_blood_pressure_lower_limb: obj["baby_blood_pressure_lower_limb"],
      urine_output:obj["urine_output"],
      abdominal_dystension:obj["abdominal_dystension"],
      frequency_of_stools: obj["frequency_of_stools"],
      vomiting: obj["vomiting"],
      retraction: obj["retraction"],
      fast_breathing: obj["fast_breathing"],
      baby_chest_indrawing: obj["baby_chest_indrawing"],
      baby_movement: obj["baby_movement"]
    });
  }
}
