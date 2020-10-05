import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../shared/service/common/common.service';
import { AppHelper } from '../shared/helper/app.helper';
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "underscore";
import { ToastrService } from 'ngx-toastr';
import { Common } from '../shared/service/common/common';
import { ChartOptions, ChartType } from 'chart.js';
import { AppConstant } from '../shared/constant/app-constant';
@Component({
  selector: 'app-score-analysis',
  templateUrl: './score-analysis.component.html',
  styleUrls: ['./score-analysis.component.css']
})
export class ScoreAnalysisComponent implements OnInit {

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private common:CommonService,
    private helper:AppHelper,private route: ActivatedRoute,private toasty:ToastrService,private commonAsyn:Common,private constant:AppConstant) { }
  formRef: any;
  inpanelFlag=false;
  outpanelFlag=false;
  data=90;
  bmrNo:string;
  inpanelList=[];
  login_hospital:any={};
  hospitalId:number;
  staffId:number;
  selectedDoctors=[];studyId:number;requestJson={};branchId:number;
  fileToUpload: File = null;
  formatFlag = false;
  fileExtension: string;
  errorMessage: string;
  fileUploadMessage: string;
  errorMessageFlag = false;
  isFileEmpty = true;
  uploadFileFail = true;scoreData={};
  currentFileUpload: File = null;reading:string;noScoreFound=true;selectedFiles=[];fileResponseList=[];
   buttonDisable=false;noScoreFoundMessage:String;colorCode:string;
   ashaUser=false;
   userTypeId:number=2;
  //  public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   legend: {
  //     position: 'left',
  //   },
  //   hover:{mode:null},
  //   plugins: {
  //     datalabels: {
  //       formatter: (value, ctx) => {
  //         //const data = ctx.chart.data[ctx.dataIndex];
  //         //return data;
  //         return value + '%';
  //       },
  //       color:'white',
  //       align:'center',
  //       font:{
  //         size:20,
  //       },
  //     },
  //   },
  // };
  // public pieChartLabels: Label[] = [['Positive Sepsis %']];
  // public pieChartData: number[] = [0];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = false;
  // public pieChartPlugins = [pluginDataLabels];
  // public pieChartColors = [
  //   {
  //     backgroundColor: ['rgba(41,140,183,1)', '#63c4e2'],
  //   },
  // ];

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.bmrNo=params['babyMrNo'];
      this.studyId=params['studyId'];
      this.reading=params['reading']
    });
    this.getUserInfo();
    this.getScore(this.studyId,this.reading,this.userTypeId)
  }

  @ViewChild('fileInput') fileInput:ElementRef;

  getUserInfo(){
    this.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    this.hospitalId=this.login_hospital['id'];
    this.staffId=this.login_hospital['staff_id'];
    this.branchId=this.login_hospital['hospital_branch_id'];
    if(this.login_hospital['user_type']==this.constant.asha_worker || this.login_hospital['user_type']==this.constant.phc_worker){
      this.ashaUser=true;
      this.userTypeId=this.login_hospital['user_type_id'];
    }else{
      this.userTypeId=this.constant.hospitalUsertType;;
    }
   
}

  open(modalName){
    this.inpanelFlag=false;
    this.outpanelFlag=false;
    this.selectedDoctors=[];
    if(!this.ashaUser){
    this.getPanelDoctors(this.hospitalId,this.staffId);
    }else{
      this.getAllRegisteredReferralDoctors();
    }
    this.formRef = this.modalService.open(modalName, this.helper.ngbModalOptions);
  }

  selectDoctor(radioButton){
    if(radioButton==0){
      this.inpanelFlag=true;
      this.outpanelFlag=false;
    }
    if(radioButton==1){
      this.outpanelFlag=true;
      this.inpanelFlag=false;
    }
  }

  close(){
    this.outpanelFlag=false;
    this.inpanelFlag=false;
    this.selectedFiles=[];
    this.selectedDoctors=[];
    this.fileResponseList=[];
    this.uploadFileFail=true;
    this.formRef.close();
  }

  success(response,apitype){
    if(apitype=="panelReferralDoctors"){
      this.inpanelList=response['response']
    }
    if(apitype=='sendOpinionRequest'){
      this.toasty.success(response['message'],'')
    }
    if(apitype=='getScore'){
      this.scoreData=response['response'];
    }
    if(apitype=='FilesUploaded'){
      // this.toasty.success(response['message'],'');
      this.fileResponseList=response['response'];
      if(this.fileResponseList.length==0){
        this.uploadFileFail=false;
      }
    }
    if(apitype=='getRegisteredReferralDoctors'){
      this.inpanelList=response['response']
    }
  }

  getPanelDoctors(hospitalId,staffId){
      this.common.getPanelReferralDoctors(hospitalId,staffId).subscribe(result=>{
        if(this.helper.success(result)){
            this.success(result,"panelReferralDoctors")
        }else{
          this.helper.errorHandler(result);
        }
      })
  }
  inpanelSelected(event){
   this.selectedDoctors=_.pluck(event.target.selectedOptions,"value");
  }
  sendOpinionRequest(){
      if(this.selectedFiles.length>0){
        this.buttonDisable=true;
        this.uploadFile();
      }
  }

  fileUpload(event,fileEvent) {
    this.formatFlag = false;
    this.isFileEmpty = false;
    for (var i = 0; i < event.target.files.length; i++) { 
     this.selectedFiles.push(event.target.files[i]);
    }
    // this.selectedFiles = event.target.files;
    // if(this.fileToUpload!=undefined){
    // this.fileExtension = this.fileToUpload.name.split('.').pop();
    // if (this.fileExtension != 'xls' && this.fileExtension != 'xlsx') {
    //   this.formatFlag = true;
    //   this.isFileEmpty=true;
    //   }else{
    //     this.formatFlag=false;
    //     this.isFileEmpty=false;;
    //   }
    // if(this.fileToUpload.name==""){
    //   this.isFileEmpty = true;
    // }
    // }
    // if(this.fileToUpload==undefined){
    //   this.isFileEmpty = true;
    // }
    // if(this.formatFlag){
    //   this.toasty.error("Only .xls and .xlsx format supported","Error..!");
    // }
    if(this.selectedFiles.length==0){
      this.toasty.error("Please select a file");
      this.isFileEmpty=true;
    }else{
      this.formatFlag=false;
       this.isFileEmpty=false;
      //  this.uploadFile();
    }
    
  }

  getScore(study_id,reading,userTypeId){
    this.common.getScore(study_id,reading,userTypeId).subscribe(response=>{
      if(this.helper.success(response)){
        this.success(response,'getScore')
        this.setPieChartData(this.scoreData)
        this.noScoreFound=false;
      }else{
        this.noScoreFound=true;
        // this.noScoreFoundMessage=response['message'];
        this.noScoreFoundMessage="Score generation is in progress. Please wait for sometime and refresh the page";
        //this.helper.errorHandler(response);
      }
    })
  }

  uploadFile(){
    const frmData = new FormData();
    if(this.selectedFiles.length>0){
      for (var i = 0; i < this.selectedFiles.length; i++) { 
        frmData.append("files", this.selectedFiles[i]);
      }
      this.common.uploadFile(frmData).subscribe(result=>{
           if(this.helper.success(result)){
             this.success(result,'FilesUploaded')
             this.sendForReferralOpinion();
           }else{
             this.helper.errorHandler(result);
             this.uploadFileFail=true;
             this.buttonDisable=false
           }
      })
    }
  }

  sendForReferralOpinion(){
    this.requestJson['referral_id']=this.selectedDoctors;
    this.requestJson['study_id']=this.studyId;
    this.requestJson['reading']=this.reading;
   //  if(this.selectedFiles.length==0 || this.fileResponseList.length==0){
   //    this.toasty.error("Please upload a file",'')
   //    return;
   //  }
    this.requestJson['fileNames']=this.fileResponseList;
    this.common.sendForOpinion(this.branchId,this.staffId,this.requestJson).subscribe(result=>{
      if(this.helper.success(result)){
         this.success(result,'sendOpinionRequest')
         this.buttonDisable=false;
         this.close();
      }
      else{
        this.helper.errorHandler(result)
        this.buttonDisable=false;
      }
    })
  }

  resetFileInput(){
    this.fileInput.nativeElement.value="";
  }

  removeFile(index){
      this.selectedFiles.splice(index,1);
   }

downloadReport(){
  this.commonAsyn.showLoader();
  this.common.downloadBmrReport(this.studyId,this.reading).subscribe(res=>{
    if(res['body']['type']!="application/json"){
      this.helper.blobSuccessResponse(res,'BMR_Report.xlsx');
      this.commonAsyn.isHide();
    }
    else{
      //this.helper.blobErrorResponse(res);
      this.toasty.error('An error occured.Please contact Development Team.','')
      this.commonAsyn.isHide();
    }
    },error=>{
      this.commonAsyn.isHide();
    });
}

setPieChartData(data){
  this.colorCode=this.helper.getColorCode(data['prediction_score'])
    // this.pieChartData=[data['prediction_score']];
    // this.pieChartColors=[{
    //   backgroundColor: [this.colorCode],
    // }]
}

getAllRegisteredReferralDoctors(){
  this.common.getAllRegisteredReferralDoctors().subscribe(result => {
    if(this.helper.success(result)){
      this.success(result, 'getRegisteredReferralDoctors');
    }else{
      this.helper.errorHandler(result);
    }
  });
}

}
