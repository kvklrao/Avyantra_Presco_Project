import { Component, OnInit } from '@angular/core';
import { AppHelper } from 'src/app/shared/helper/app.helper';
import { AppConstant } from 'src/app/shared/constant/app-constant';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ReadingDataService } from 'src/app/shared/service/reading-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asha-phc-dashboard',
  templateUrl: './asha-phc-dashboard.component.html',
  styleUrls: ['./asha-phc-dashboard.component.css']
})
export class AshaPhcDashboardComponent implements OnInit {
  formRef:any;
  login_hospital:any={};
  ashaUserId:number;
  recordCounts:number;
  page=1;
  pageLength:number;
  ashaBmrList=[];
  searchText:string;
  opinionList=[];
  userTypeId:number;
  bmrNo:string;
  motherName:string;
  constructor(private helper:AppHelper,private constant:AppConstant,private common:CommonService,private dataService:DataService,
    private router:Router,public readingDataService:ReadingDataService,private modalService:NgbModal) { }

  ngOnInit() {
    this.searchText=null;
    this.pageLength=this.constant.pageLimit;
    this.dataService.clearOption();
    this.getLoggedInUserInfo();
    this.getAshaBMrRecordsCount(this.ashaUserId,this.searchText,this.userTypeId);

  }

  getLoggedInUserInfo() {
    this.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    this.ashaUserId=this.login_hospital['hospital_id'];
    this.userTypeId=this.login_hospital['user_type_id']
    //this.ashaUserId=this.login_hospital['user_id'];
  }

  getAshaBMrRecordsCount(ashaUserId,searchText,userTypeId){
    this.common.getAshaBMRCounts(ashaUserId,searchText,userTypeId).subscribe(response=>{
      if(this.helper.success(response)){
        this.recordCounts=response['response'][0]['aasha_medical_count'];
        this.getAshaBMRRecords(this.page,this.pageLength,this.ashaUserId,this.searchText,this.userTypeId);
      }
    })
  }

  getAshaBMRRecords(start,limit,ashaUserId,searchText,userTypeId){
    this.common.getAshaBMRRecords(start,limit,ashaUserId,searchText,userTypeId).subscribe(response=>{
      if(this.helper.success(response)){
        this.ashaBmrList=response['response'];
      }else{
        this.helper.errorHandler(response);
      }
    })
  }

  onDropDownChange(pagelength){
    this.getAshaBMRRecords(this.page,this.pageLength,this.ashaUserId,this.searchText,this.userTypeId);
  }

  nextPage(page) {
    let self = this;
    self.page = page;
    this.getAshaBMRRecords(self.page,self.pageLength,self.ashaUserId,self.searchText,this.userTypeId);
  }

  ahsaBmrSearch(){
    if(this.searchText!=''){
    this.getAshaBMrRecordsCount(this.ashaUserId,this.searchText,this.userTypeId);
    }else{
      this.searchText=null;
      this.getAshaBMrRecordsCount(this.ashaUserId,this.searchText,this.userTypeId);
    }
  }

  goToAshaForm(obj){
    this.dataService.setOption(obj);
     this.readingDataService.reading="R1";
     this.checkReading(obj);
    this.readingDataService.searchResetComponentFlags();
    this.router.navigate(['/dashboard']);
  }

  getOpinions(studyId){
    this.common.getAshaPhcViewOpinion(studyId).subscribe(response=>{
      if(this.helper.success(response)){
        this.success(response,'referralOpinions')
      }else{
        this.opinionList=[];
       // this.helper.errorHandler(response);
      }
    })
  }

  success(response,apiType){
    if(apiType=='referralOpinions'){
      this.opinionList=response['response'];
    }
  }

  open(openModal,obj) {
    this.bmrNo=obj['baby_medical_record_number'];
    this.motherName=obj['mother_name']
    this.getOpinions(obj['study_id'])
    this.formRef = this.modalService.open(openModal, this.helper.ngbModalOpinionOptions);
  }

  close(){
    this.formRef.close();
  }

  checkReading(obj){
    if(obj['reading']!=null){
        this.readingDataService.ashaPhcScore=true;
    }else{
      this.readingDataService.setAshaWorkerActiveStatus('babyProfile');
      this.readingDataService.setAshaWorkerActiveStatus('motherProfile');
        this.readingDataService.ashaPhcScore=false;
    }
  }


}
