import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class ReadingDataService {
public readingFormsData={};
public allFormValidationStatus={};
public reading:string;
public babyReadingData={};
public checkComponentState = {
  //'mother-profile':false,
  'baby-appear':false,
  'baby-cns': false,
  'baby-cv': false,
  'baby-resp': false,
  'baby-git': false,
  'baby-investigation': false,
  'baby-antibiotic': false,
  'baby-final':false,
  // 'health-parameters':false
};
public healthParamData={};
public isMotherProfileHaveResp = true;
public showSaveReadingButton = true;
public haveMotherProfile = true;
public ashaForms={'babyProfile':false,'motherProfile':false}
public ashaPhcScore=false;

private messageSource = new BehaviorSubject('default message');
tabMessage = this.messageSource.asObservable();

private showBabyProfile = new BehaviorSubject('message');
openForm = this.showBabyProfile.asObservable();

  constructor() { }

  getReadingFormData(formName){
      return this.readingFormsData[formName];
  }

  setReadingFormData(formName,data){
    this.readingFormsData[formName]=data;
  }

  clearReadingFormData(){
    this.readingFormsData={};
  }

  getAllFormData(){
    return this.readingFormsData;
  }

  setComponentFlag(componentName) {
    this.checkComponentState[componentName] = true
  }

  getComponentFlag(){
    return this.checkComponentState;
  }

  setActiveTab(message: string) {
    this.messageSource.next(message)
  }

  showBabyProfileForm(message: string) {
    this.showBabyProfile.next(message)
  }
  reset() {
    let reset = {
      //'mother-profile':false,
      'baby-appear':false,
      'baby-cns': false,
      'baby-cv': false,
      'baby-resp': false,
      'baby-git': false,
      'baby-investigation': false,
      'baby-antibiotic': false,
      'baby-final':false,
      // 'health-parameters':false
    };
    this.checkComponentState = reset;
  }

  setFormValidationStatus(formName,statusFlag){
    this.allFormValidationStatus[formName]=statusFlag;
   // console.log(this.allFormValidationStatus)
  }

  getFormValidationStatus(){
    return this.allFormValidationStatus;
  }

  searchResetComponentFlags(){
    this.checkComponentState = {
      //'mother-profile':true,
      'baby-appear':true,
      'baby-cns': true,
      'baby-cv': true,
      'baby-resp': true,
      'baby-git': true,
      'baby-investigation': true,
      'baby-antibiotic': true,
      'baby-final':true,
      // 'health-parameters':false
    };
  }

  resetAll(){
    this.isMotherProfileHaveResp=true;
    this.isMotherProfileHaveResp=true;
    this.haveMotherProfile=true;
    // this.messageSource.unsubscribe();
    // this.showBabyProfile.unsubscribe();
  }

  newReadingStatusFlags(){
    this.checkComponentState = {
     // 'mother-profile':true,
      'baby-appear':true,
      'baby-cns': false,
      'baby-cv': false,
      'baby-resp': false,
      'baby-git': false,
      'baby-investigation': false,
      'baby-antibiotic': false,
      'baby-final':false,
      // 'health-parameters':false
    };
  }

  unsubscribeBabyProfile(){
    this.showBabyProfile.unsubscribe();
  }

  setBabyReadingData(data){
    this.babyReadingData=data;
  }

  getBabyReadingData(){
    return this.babyReadingData;
  }

  getAshaWorkerReadingForm(){
    return {
      "baby_appears": {
        "study_id": 484,
        "reading_date": "NA",
        "time_of_reading_hours": "NA",
        "time_of_reading_minute": "NA",
        "baby_weight_at_birth": "NA",
        "baby_weight_at_birth_unit": "NA",
        "baby_appearance": "NA",
        "baby_skin_colour": "NA",
        "baby_cry_sound": "NA",
        "baby_cry_sound_status": "NA",
        "hypotonia_muscular_response_one_min_after_birth": "NA",
        "hypotonia_muscular_response_five_min_after_birth": "NA",
        "excessive_sleeping": "NA",
        "hypothermia": "NA",
        "hypothermia_status": "NA",
        "hypothermia_status_value": "NA",
        "baby_feeding_status": "NA",
        "baby_presence_of_convulsions": "NA",
        "baby_jaundice": "NA",
        "breast_feeding_initiation": "NA",
        "kangaroo_mother_care": "NA",
        "umbilical_discharge": "NA",
        "reading": "R1"
      },
      "baby_resp": {
        "study_id": 484,
        "groaning": "NA",
        "grunting": "NA",
        "stridor": "NA",
        "retraction": "NA",
        "fast_breathing": "NA",
        "oxygen_saturation": "NA",
        "breathing_rate": "NA",
        "baby_chest_indrawing": "NA",
        "x_ray_result": "NA",
        "x_ray_status_done": "NA",
        "x_ray_status": "NA",
        "x_ray_diagnosis_any_other": "",
        "apnea_diagnosis": "NA",
        "apnea_status": "NA",
        "baby_respiratory_support": "[{\"id\":7,\"itemName\":\"NA\"}]",
        "baby_respiratory_support_if_yes": "NA",
        "reading": "R1",
        "tab_name": "baby_resp_add"
      },
      "baby_cv": {
        "study_id": 484,
        "heart_rate": "NA",
        "urine_output": "NA",
        "baby_blood_pressure_mean_arterial_bp": "NA",
        "baby_blood_pressure_upper_limb": "NA",
        "baby_blood_pressure_lower_limb": "NA",
        "capillary_refill_unit": "NA",
        "low_peripheral_pulse_volume": "NA",
        "cool_peripheries": "NA",
        "two_d_echo_done": "NA",
        "two_d_echo_done_if_yes": "NA",
        "baby_on_ionotropes": "NA",
        "central_line": "NA",
        "skin_pustules": "NA",
        "infusion_of_blood_products": "NA",
        "reading": "R1"
      },
      "baby_cns": {
        "study_id": 484,
        "features_of_encephalopathy": "NA",
        "seizures": "NA",
        "abnormal_movements_like_tonic_posturing": "NA",
        "af_bulge": "NA",
        "tab_name": "baby_cns_add",
        "reading": "R1"
      },
      "baby_git": {
        "study_id": 484,
        "abdominal_dystension": "NA",
        "frequency_of_stools": "NA",
        "diarrhea": "NA",
        "vomiting": "NA",
        "feeding_intolerance": "NA",
        "baby_movement": "NA",
        "reading": "R1",
        "tab_name": "baby_git"
      },
      "baby_investigation": {
        "study_id": 484,
        "baby_thyroid_status": "NA",
        "baby_thyroid_result": "NA",
        "baby_blood_glucose": "NA",
        "baby_haemoglobin_levels": "NA",
        "baby_c_reactive_protien_levels": "NA",
        "micro_esr": "NA",
        "baby_procalcitonin_levels": "NA",
        "total_leucocute_count_unit": "NA",
        "total_leucocute_count": "NA",
        "absolute_neutrophil_count": "NA",
        "absolute_neutrophil_count_unit": "NA",
        "immature_to_mature_neutrophil_ratios": "NA",
        "thrombocytopenia_unit": "NA",
        "thrombocytopenia": "NA",
        "urine_rest_for_pus_cells": "NA",
        "urine_culture_test": "NA",
        "blood_culture_report": "NA",
        "gram_positive_bacteria": "[{\"id\":7,\"itemName\":\"NA\"}]",
        "gram_positive_bacteria_if_other": "",
        "gram_negative_bacteria": "[{\"id\":13,\"itemName\":\"NA\"}]",
        "gram_negative_bacteria_if_other": "",
        "fungi": "[{\"id\":5,\"itemName\":\"NA\"}]",
        "other_organism": "Normal Orophayngeal flora",
        "antibiotic_status_resisitant": "NA",
        "antibiotic_status_intermediate": "NA",
        "antibiotic_status_value": "NA",
        "sodium": "NA",
        "potassium": "NA",
        "chlorine": "NA",
        "calcium": "NA",
        "phosphate": "NA",
        "magnesium": "NA",
        "urea": "NA",
        "creatinine": "NA",
        "lactate_levels": "NA",
        "bilirubin_levels": "NA",
        "cord_ph": "NA",
        "arrhythmia": "NA",
        "csf_culture": "NA",
        "csf_culture_tsb_value": "NA",
        "reading": "R1",
        "tab_name": "final"
      },
      "baby_antibiotic": {
        "study_id": 484,
        "antibiotic_given": "NA",
        "date_of_administration_of_antiobiotic": "NA",
        "time_of_administration_of_antiobiotic_hours": "NA",
        "time_of_administration_of_antiobiotic_minute": "NA",
        "antibiotic_name": "NA",
        "antibiotic_name_if_other": "",
        "date_of_blood_samples_sent_for_culture_test": "NA",
        "time_of_blood_samples_sent_for_culture_test_hours": "NA",
        "time_of_blood_samples_sent_for_culture_test_minute": "NA",
        "blood_sample_taken_prior_to_antiobiotic_administration": "NA",
        "reading": "R1"
      },
      "baby_final": {
        "study_id": 484,
        "days_of_stay_in_hospital": "NA",
        "final_diagnosis_sepsis": "NA",
        "final_diagnosis_rds": "NA",
        "final_diagnosis_ttnb": "NA",
        "final_diagnosis_jaundice": "NA",
        "final_diagnosis_lbw": "NA",
        "final_diagnosis_lga": "NA",
        "final_diagnosis_aga": "NA",
        "final_diagnosis_anemia": "NA",
        "final_diagnosis_dextochordia": "NA",
        "final_diagnosis_hypoglycemia": "NA",
        "final_diagnosis_hypocalcemia": "NA",
        "final_diagnosis_gastroenteritis": "NA",
        "final_diagnosis_perinatal_respiratory_depression": "NA",
        "final_diagnosis_shock": "NA",
        "final_diagnosis_feeding_intolerence": "NA",
        "baby_discharge_date": "NA",
        "final_diagnosis_sga": "NA",
        "final_diagnosis_eos_los": "NA",
        "final_diagnosis_other": "NA",
        "reading": "R1",
        "tab_name": "genral"
      }
    }
  }

  setAshaWorkerActiveStatus(formName){
    this.ashaForms[formName]=true;
  }

  getAshaFormStatus(formName){
    return this.ashaForms[formName];
  }
  
  resetAshaWorker(){
    this.ashaForms['babyProfile']=false;
    this.ashaForms['motherProfile']=false;
  }

  saveAshaReadingFormData(formData){
    this.healthParamData=formData;
  }
  getAshaReadingFormData(){
    return this.healthParamData;
  }
  clearAshaReadingFormData(){
    this.healthParamData={};
  }
  
}
