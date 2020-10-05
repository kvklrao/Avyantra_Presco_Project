import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from 'src/app/shared/constant/app-constant';
import { Common } from 'src/app/shared/service/common/common';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-referral-doctor',
  templateUrl: './referral-doctor.component.html',
  styleUrls: ['./referral-doctor.component.css']
})
export class ReferralDoctorComponent implements OnInit {

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private common:CommonService,private helper:AppHelper,private toasty:ToastrService,private constant:AppConstant,private commonAsyn:Common) { }
  formRef: any;
  referralOpinion: FormGroup;
  submitted=false;login_hospital:any={};referralId:number;dashboardData={};opinionRequestList=[];selectedOpinion=null;page=1;
  pageLength:number;start=1;totalCount:number;
  resultType=2
  ngOnInit() {
    this.pageLength=this.constant.pageLimit;
    this.getUserInfo();
    this.createForm();
    this.getDashboardData();
    this.getOpinionListCount();
  }
createForm(){
  this.referralOpinion = this.formBuilder.group({
    opinion: ["", [Validators.required]],
    prescription: ["", [Validators.required]],
  });
}
getUserInfo(){
  this.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
  this.referralId=this.login_hospital['referral_id'];
}
getDashboardData(){
  this.common.getReferralDashboardData(this.referralId).subscribe(response=>{
    if(this.helper.success(response)){
      this.dashboardData=response['response'];
      // this.getOpinionList(this.start,this.pageLength);
    }
    else{
      this.helper.errorHandler(response);
    }
  })
}
  close() {
    this.resetForm();
    this.formRef.close();
  }

  open(openModal,obj) {
    this.selectedOpinion=obj['staff_referral_hospital_id'];
    this.formRef = this.modalService.open(openModal, { size: "lg" });
  }
  sendOpinion(){
    if(this.referralOpinion.invalid){
      this.submitted=true;
      return;
    }
    if(this.selectedOpinion==null || this.selectedOpinion==0 || this.selectedOpinion==undefined){
      return;
    }
    this.common.saveOpinion(this.selectedOpinion,this.referralOpinion['value']).subscribe(response=>{
      if(this.helper.success(response)){
          this.success(response,'savedOpinion')
          this.selectedOpinion=null;
          this.close();
      }else{
        this.helper.errorHandler(response);
      }
    })
  }

  resetForm(){
    this.createForm();
  }

  success(response,apiType){
    if(apiType=='referralOpinionList'){
        this.opinionRequestList=response['response'];
    }
    if(apiType=='savedOpinion'){
      this.toasty.success(response['message'],'')
    }
    if(apiType=='referralOpinionListCount'){
        this.totalCount=response['response']['refferal_detail_count'];
    }
    if(apiType=='ashaPhcOpinionCount'){
      this.totalCount=response['response']['aasha_referral_count'];
    }
    if(apiType=='ashaPhcOpinionList'){
      this.opinionRequestList=response['response'];
    }
  }

  getOpinionListCount(){
    this.common.getReferralOpinonListCount(this.referralId).subscribe(response=>{
      if(this.helper.success(response)){
        this.success(response,'referralOpinionListCount')
        this.getOpinionList(this.page,this.pageLength);
        // this.close();
      }else{
        this.helper.errorHandler(response);
      }
    })
  }

  getOpinionList(start,pageLimit){
    this.common.getReferralOpinonList(this.referralId,start,pageLimit).subscribe(response=>{
      if(this.helper.success(response)){
        this.success(response,'referralOpinionList')
        this.selectedOpinion=null;
        // this.close();
      }else{
        this.helper.errorHandler(response);
      }
    })
  }

  downloadFile(fileName,fileReferalId){
    this.commonAsyn.showLoader();
    this.common.downloadReferralAttachmentFile(fileReferalId)
    .subscribe(res => {
        if(res['body']['type']!="application/json"){
        this.helper.blobSuccessResponse(res,fileName);
        this.commonAsyn.isHide();
      }
      else{
        this.helper.blobErrorResponse(res);
        this.commonAsyn.isHide();
      }
      },error=>{
        this.commonAsyn.isHide();
      });
  }

  onDropDownChange(pageLength){
    this.page=1;
    this.getOpinionList(this.page,this.pageLength);
  }

  nextPage(page){
    this.page=page;
    if(this.resultType==2){
      this.getOpinionList(this.page,this.pageLength);
  }
  if(this.resultType==7 || this.resultType==8){
    this.getAshaReferralRecords(this.referralId,this.page,this.pageLength,this.resultType);
  }
  }


  changeResut(event){
    this.page=1;
    if(this.resultType==2){
        this.getOpinionListCount();
    }
    if(this.resultType==7 || this.resultType==8){
        this.getAshaReferralDetailCount(this.referralId,this.resultType)
    }
  }

  getAshaReferralDetailCount(referralId,userType){
    this.common.getAshaPhcOpinionCount(referralId,userType).subscribe(response=>{
      if(this.helper.success(response)){
        this.success(response,'ashaPhcOpinionCount')
        this.getAshaReferralRecords(referralId,this.page,this.pageLength,userType);
        // this.close();
      }else{
        this.helper.errorHandler(response);
      }
    })
  }

  getAshaReferralRecords(referralId,start,limit,userType){
    this.common.getAshaPhcOpinion(referralId,start,limit,userType).subscribe(response=>{
      if(this.helper.success(response)){
        this.success(response,'ashaPhcOpinionList')
        // this.close();
      }else{
        this.helper.errorHandler(response);
      }
    })
  }
}
