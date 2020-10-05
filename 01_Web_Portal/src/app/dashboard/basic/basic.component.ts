import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../shared/service/common/common.service";
import * as _ from "underscore";
import { Util } from "../../shared/core/util";

@Component({
  selector: "app-basic",
  templateUrl: "./basic.component.html",
  styleUrls: ["./basic.component.css"]
})
export class BasicComponent implements OnInit, OnChanges {
  basicForm: FormGroup;
  submitted = false;
  already_exist_status = 422;
  success_status = 200;
  @Input() id;
  @Input() patient_info;
  login_hospital: any = {};
  is_exist_user = false;
  continueWith = false;
  existingId = "";
  formRef: any;

  @Output() is_save_success: EventEmitter<any> = new EventEmitter<any>();
  @Output() continueWithSameRecord = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private common_api: CommonService,
    private util: Util
  ) { }

  ngOnInit() {
    const vim = this;
    vim.login_hospital = JSON.parse(localStorage.getItem("login_hospital"));
    if (!_.isEmpty(vim.patient_info)) {
      vim.is_exist_user = true;
    } else {
      vim.id = "";
      vim.is_exist_user = false;
    }
    vim.createForm(vim.id);
  }

  createForm(id) {
    const vim = this;
    vim.basicForm = vim.formBuilder.group({
      id: [vim.login_hospital.id, Validators.required],
      hospital_name: [vim.login_hospital.hospital_name, Validators.required],
      hospital_branch_name: [
        vim.login_hospital.hospital_branch_name,
        Validators.required
      ],
      baby_medical_record_number: [
        vim.patient_info["baby_medical_record_number"],
        Validators.required
      ],
      baby_mother_medical_record_number: [
        vim.patient_info["baby_mother_medical_record_number"],
        Validators.required
      ],
      baby_mother_name: [""],
      baby_name: [""]
    });
    vim.reateForm();
  }

  reateForm() {
    const vim = this;
    vim.basicForm.patchValue({
      id: vim.login_hospital["id"],
      hospital_name: vim.login_hospital["hospital_name"],
      hospital_branch_name: vim.login_hospital.hospital_branch_name,
      study_id: vim.patient_info["study_id"],
      medical_record_number: vim.patient_info["medical_record_number"],
      // patient_id: vim.patient_info["patient_id"],
      baby_medical_record_number:
        vim.patient_info["baby_medical_record_number"],
      baby_mother_medical_record_number:
        vim.patient_info["baby_mother_medical_record_number"]
    });
  }

  ngOnChanges() {
    this.createForm(this.id);
  }
  reset() {
    this.createForm(null);
  }

  close() {
    //console.error("close this event")
    this.formRef.close();
  }

  signup() {
    this.submitted = true;
    if (this.basicForm.invalid) {
      return;
    }
    this.basicForm.value["tab_name"] = "basic";

    const newUser = this.common_api.patient_basic_info_updated(
      this.basicForm.value
    );
    newUser.subscribe(
      response => {
        // this.reset();
        console.clear();
        // this.is_save_success.emit();
        this.success(response, "signup");
      },
      error => {
        console.error("errro", error);
      }
    );
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
    if (api_type == "signup") {
      console.clear();
      console.error(vim.isSuccess(response));
      if (vim.isSuccess(response)) {
        vim.util.setPatient();
        vim.is_save_success.emit();
        vim.toastr.success(
          "",
          "Information Updated succesfully..!"
        );
      } else {
        if (vim.isAlreadyExist(response)) {
          // vim.toastr.warning(response["message"]);
          var st_id = JSON.stringify(response.response.id)
          this.open_baby_exist(st_id);
        } else {
          vim.errorToasty(response);
        }
      }
    }
  }

  open_baby_exist(st_id) {
    // this.modalService.open('<h1>MJ</h1>', { size: "lg" });
    // $('.btn_save_baby').hide();
    $('.btn_save_div').html('<h4>This record is already exist. </h4> <button type="button" id="continue_record_search" class="btn btn-primary btn_save_baby">Continue with same</button> &nbsp;&nbsp;<button type="button" class="btn btn-primary" id="btn_dup_create">Create New Record</button> ');
    var dup_btn_element = document.getElementById('btn_dup_create');
    const newScope = this;
    dup_btn_element.onclick = function () {

      newScope.submitted = true;
      if (newScope.basicForm.invalid) {
        return;
      }
      newScope.basicForm.value["tab_name"] = "basic";
      const newUser = newScope.common_api.patient_basic_info_dup_updated(
        newScope.basicForm.value, newScope.login_hospital.id
      );
      newScope.existingId = st_id;
      newScope.continueWithSameRecord.emit(newScope.existingId);
      newUser.subscribe(
        response => {
          // this.reset();
          console.clear();
          // this.is_save_success.emit();
          newScope.success(response, "signup");
        },
        error => {
          console.error("errro", error);
        }
      );
    }


    var continueButton = document.getElementById('continue_record_search');

    continueButton.onclick = function () {

      // alert("In Continue");
      newScope.view_patient(st_id)
      newScope.success({status:200}, "signup");
    }

  }
  view_patient(st_id) {
    this.existingId = st_id;
    this.continueWithSameRecord.emit(this.existingId);
    // this.get_general.emit(); 
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
    if (api_type == "signup") {
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
}
