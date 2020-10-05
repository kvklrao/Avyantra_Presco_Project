import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from "../../shared/service/common/common.service";
import * as _ from "underscore";
import { Common } from "../../shared/service/common/common";
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/service/data.service';
import { ReadingDataService } from '../../shared/service/reading-data.service';
import { AppConstant } from 'src/app/shared/constant/app-constant';

@Component({
  selector: "app-baby-git",
  templateUrl: "./baby-git.component.html",
  styleUrls: ["./baby-git.component.css"],
  providers: [NgbModalConfig, NgbModal]
})
export class BabyGitComponent implements OnInit, OnChanges {
  babyGitForm: FormGroup;
  formRef: any;
  submitted = false;
  already_exist_status = 422;
  success_status = 200;
  responseArray = [];
  page: number = 1;

  isGitFormEdit: boolean = true;
  getMedicalRecordNumber: string;
  isEditClicked: boolean = false;

  isStools: boolean = true;

  @Input() id;
  @Input() hospital_id;
  subscription: Subscription;

  temp_study_id = 0;
  login_hospital: any = {};
  content: any;
  public dataServiceObj;
  public readingDataObj;
  loggedInUserId:number;
  phcUser=false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private common_api: CommonService,
    private modalService: NgbModal,
    private commonAsyn: Common,
    private dataService: DataService,
    public readingDataService: ReadingDataService,private constant:AppConstant
  ) {
    this.dataServiceObj = dataService.getOption();
  }

  ngOnInit() {
    const vim = this;
    vim.dataServiceObj = vim.dataService.getOption();
    vim.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    vim.loggedInUserId=vim.login_hospital['user_id'];
    vim.readingDataObj = vim.readingDataService.getReadingFormData('baby_git');
    this.checkUser();
    vim.temp_study_id = vim.id;
    vim.id = vim.dataServiceObj.study_id;
    vim.createForm(vim.dataServiceObj.study_id);
    if (vim.readingDataObj != undefined) {
      vim.getMedicalRecordNumber=vim.dataServiceObj.baby_medical_record_number;
      vim.getReadingFormData(this.readingDataObj);
    }
    else {
      if (vim.dataServiceObj.study_id != undefined) {
        vim.getMedicalRecordNumber = vim.dataServiceObj.baby_medical_record_number;
        vim.get_baby_git(vim.dataServiceObj.study_id, vim.login_hospital['id'], vim.page, vim.readingDataService.reading);
      }
    }
    vim.onChanges();
  }
  

  checkUser(){
    if(this.login_hospital['user_type']==this.constant.phc_worker){
      this.phcUser=true;
    }
  }

  createForm(id) {
    const vim = this;
    vim.isStools = true;

    this.babyGitForm = this.formBuilder.group({
      study_id: [vim.id],
      abdominal_dystension: ["", Validators.required],
      frequency_of_stools: ["", [Validators.required]],
      diarrhea: ["", Validators.required],
      vomiting: ["", Validators.required],
      feeding_intolerance: ["", Validators.required],
    });
  }

  updateForm(obj) {
    const vim = this;
    if (obj["frequency_of_stools"] == 'NA') {
      vim.isStools = false;
      vim.babyGitForm.controls["frequency_of_stools"].clearValidators();
      vim.babyGitForm.controls["frequency_of_stools"].updateValueAndValidity();
    } else {
      vim.isStools = true;
      vim.babyGitForm.controls["frequency_of_stools"].setValidators([Validators.required]);
      vim.babyGitForm.controls["frequency_of_stools"].updateValueAndValidity();
    }
    vim.babyGitForm.patchValue({
      study_id: vim.id,
      abdominal_dystension: obj["abdominal_dystension"],
      frequency_of_stools: obj["frequency_of_stools"],
      diarrhea: obj["diarrhea"],
      vomiting: obj["vomiting"],
      feeding_intolerance: obj["feeding_intolerance"],
    });
  }

  onInputChange(event) {
    var vim = this;
    var target = event.target || event.srcElement || event.currentTarget;
    if (target.name == 'Frequency') {
      if (target.value == '2') {
        vim.isStools = false;
        vim.babyGitForm.patchValue({
          frequency_of_stools: 'NA'
        })
        vim.babyGitForm.value["frequency_of_stools"] = 'NA';

        vim.babyGitForm.controls["frequency_of_stools"].clearValidators();
        vim.babyGitForm.controls["frequency_of_stools"].updateValueAndValidity();
      } else {
        vim.isStools = true;
        vim.babyGitForm.controls["frequency_of_stools"].setValidators([Validators.required]);
        vim.babyGitForm.controls["frequency_of_stools"].updateValueAndValidity();
        vim.babyGitForm.patchValue({
          frequency_of_stools: ''
        })


      }
    }
  }

  ngOnChanges() {
    this.createForm(this.id);
  }
  reset() {
    this.createForm(null);
  }

  open(content, obj) {
    this.submitted = false;
    if (!_.isEmpty(obj)) {
      this.isGitFormEdit = true;
      this.isEditClicked = true;
      this.updateForm(obj);
    } else {
      this.isGitFormEdit = true;
      this.createForm(this.id);
    }
  }

  babyGitFormSubmit() {
    const vim = this;
    vim.submitted = true;
    if (vim.babyGitForm.invalid) {
      return;
    }

    if (this.babyGitForm.value["frequency_of_stools"] == '') {
      this.babyGitForm.value["frequency_of_stools"] = 'NA';
    }

    //  vim.commonAsyn.showLoader();
    vim.babyGitForm.value["tab_name"] = "baby_git";
    // const newUser = vim.common_api.baby_git_add(vim.babyGitForm.value);
    // newUser.subscribe(
    //   response => {
    //     vim.reset();
    //     vim.success(response, "babyGitFormSubmit");
    //   },
    //   error => {
    //     console.error("errro", error);
    //   }
    // );
    vim.babyGitForm.value["reading"] = localStorage.getItem('reading');
    vim.goToNextReadingForm();
  }
  /**
   *
   * @param response
   * @param api_type
   * @method: success
   * @purpose :-  it is a common helper
   */

  success(response, api_type) {
    const vim = this;
    if (api_type == "babyGitFormSubmit") {
      if (vim.isSuccess(response)) {
        vim.toastr.success(
          "",
          "Information Updated succesfully"
        );
        vim.responseArray = [];
        this.page = 1;
        vim.dataServiceObj = vim.dataService.getOption();
        vim.get_baby_git(vim.dataServiceObj.study_id, vim.login_hospital['id'], this.page, vim.readingDataService.reading);
      } else {
        if (vim.isAlreadyExist(response)) {
          vim.toastr.warning("Already Exist!!", response["message"]);
        } else {
          vim.errorToasty(response);
        }
      }
    } else if (api_type == "get_baby_git") {
      if (vim.isSuccess(response)) {
        if (this.page == 1) {
          vim.responseArray = [];
          vim.responseArray = response["response"];
          vim.isGitFormEdit = false;
        } else {
          if (response["status"] == 404) {
          }
          else if (response["response"].length > 0) {
            vim.temp_study_id = response["response"][0].study_id;
            if (vim.temp_study_id == vim.id) {
            } else {
              vim.responseArray = [];
            }

            for (var i = 0; i < response["response"].length; i++) {
              vim.responseArray.push(response["response"][i]);
              vim.temp_study_id = vim.id;
            }
          }
        }
        vim.commonAsyn.isHide();
      } else {
        vim.responseArray = [];
        vim.commonAsyn.isHide();
        if (vim.isAlreadyExist(response)) {
        } else {
        }
      }
    }
  }

  /**
   *
   * @param error
   * @param api_type
   * @purpose :-  This is error handler method is called.
   * @method: errorHandler
   */
  errorHandler(error, api_type) {
    const vim = this;
    if (api_type == "babyGitFormSubmit") {
      vim.errorToasty(error);
    }
  }

  /**
   *
   * @param response
   * @method: it is a common herlper for check the status is 200 or not
   */
  isSuccess(response) {
    const vim = this;
    if (
      response.hasOwnProperty("status") &&
      response["status"] === vim.success_status
    ) {
      return true;
    } else if (response["status"] === 404) {
      return true;
    }
    return false;
  }
  /**
   *
   * @param response
   * @method :- isAlreadyExist
   * @purpose :- check if User Already Exist.
   */
  isAlreadyExist(response) {
    const vim = this;
    if (
      response.hasOwnProperty("status") &&
      response["status"] === vim.already_exist_status
    ) {
      return true;
    }
    return false;
  }
  /**
   * @method :- errorToasty
   */
  errorToasty(error) {
    const vim = this;
    if (error.hasOwnProperty("message")) {
      vim.toastr.error("Error!", error["message"]);
    } else {
      vim.toastr.error("Error!", "Somethink wrong!!!..");
    }
  }

  get_baby_git(id, hospital_id, page, reading) {
    const vim = this;
    if (vim.temp_study_id == vim.id) {

    } else {
      vim.page = 1;
      vim.temp_study_id = vim.id;
    }
    const newdata = vim.common_api.get_tabs("patient/baby_git", id, hospital_id, page, reading);
    newdata.subscribe(
      response => {
        vim.success(response, "get_baby_git");
        vim.isGitFormEdit = false;
      },
      error => {
        console.error("errro", error);
      }
    );
  }

  getReadingFormData(formData) {
    this.responseArray[0] = formData;
    this.updateForm(this.responseArray[0]);
    this.isGitFormEdit = true;
  }

  saveReadingFormData(formData) {
    this.readingDataService.setReadingFormData('baby_git', formData);
  }

  goToNextReadingForm(){
    let vim=this;
    vim.saveReadingFormData(vim.babyGitForm['value']);
    vim.readingDataService.setComponentFlag('baby-investigation')
    vim.readingDataService.setActiveTab("baby-investigation")
    vim.router.navigate(["dashboard/baby-investigation"]);
  }

  onChanges(): void {
    this.babyGitForm.statusChanges.subscribe(val => {
      if(val==='INVALID'){
        this.readingDataService.setFormValidationStatus('baby_git',false)
          if(this.readingDataObj!=undefined){
            this.babyGitForm.value["reading"] = localStorage.getItem('reading');
            this.saveReadingFormData(this.babyGitForm['value']);
          }
      }
      else{
        this.readingDataService.setFormValidationStatus('baby_git',true)
        if(this.readingDataObj!=undefined){
          this.babyGitForm.value["reading"] = localStorage.getItem('reading');
          this.saveReadingFormData(this.babyGitForm['value']);
        }
      }
    });
  }

  update_git_form() {
    var vim = this;
    vim.submitted = true;
    if(vim.babyGitForm.invalid) {
      return;
    } else {
      if (this.babyGitForm.value["frequency_of_stools"] == '') {
        this.babyGitForm.value["frequency_of_stools"] = 'NA';
      }
      vim.babyGitForm.value["tab_name"] = "baby_git";
    vim.common_api.updateFormData('patient/update/baby_git/', vim.id, vim.readingDataService.reading, vim.babyGitForm.value,vim.loggedInUserId)
    .subscribe(result => {
      if(result['status'] != 200) {
        vim.toastr.error(result['message']);
      } else {
        vim.toastr.success(
          "",
          "Data Updated Succesfully"
        );
        vim.isEditClicked = false;
        vim.get_baby_git(vim.dataServiceObj.study_id, vim.login_hospital['id'], this.page, vim.readingDataService.reading);
      }
    })
    }
  }
}
