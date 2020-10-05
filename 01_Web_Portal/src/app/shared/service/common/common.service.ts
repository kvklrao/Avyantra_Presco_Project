import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Subject } from 'rxjs';  
import { Observable } from 'rxjs';
// import { Http, ResponseContentType, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  status = false;
  baseUrl = environment.server_url;
  private subject = new Subject<any>(); 
  private subject_for_medical_number = new Subject<any>(); 

  constructor(private http: HttpClient) {}
  
  sendBirthDate(message: string) {  
    this.subject.next({ text: message });  
  }  

  getBirthDate(): Observable<any> {  
    return this.subject.asObservable();  
  }
  setMedicalRecordNumber(message: string) {  
    this.subject_for_medical_number.next({ text: message });  
  }
  getMedicalRecordNumber(): Observable<any> {  
    return this.subject_for_medical_number.asObservable();  
  }
  patient_signup(data) {
    return this.http.post(this.baseUrl + "patient/signup", data, this.jwt());
  }
  get_patients(obj = { hospital_name: "test" }) {
    return this.http.post(this.baseUrl + "patient/get_patients",obj,this.jwt());
  }
  get_level(patient_id) {
    return this.http.post(this.baseUrl + "patient/get_level/" + patient_id,[],this.jwt());
  }
  get_tabs_general(method_url, study_id, hospital_id, page_no) {
    return this.http.post(this.baseUrl + method_url + "/" + study_id + "/" + hospital_id + "/" + page_no,[],this.jwt());
  }
  get_tabs_maternal(method_url, study_id, hospital_id, page_no) {
    return this.http.post( this.baseUrl + method_url + "/" + study_id + "/" + hospital_id + "/" + page_no,[],this.jwt());
  }
  get_tabs(method_url, study_id, hospital_id, page_no, reading) {
    return this.http.get(this.baseUrl + method_url + "/" + study_id + "/" + hospital_id + "/" + page_no + "/" + reading,this.jwt());
  }
  get_order_record(method_url, obj) {
    return this.http.post(this.baseUrl + method_url + "/", obj, this.jwt());
  }
  patient_basic_info_updated(data) {
    return this.http.post(this.baseUrl + "patient/basic/add", data, this.jwt());
  }
  patient_basic_info_dup_updated(data,hospital_id) {
    return this.http.post(this.baseUrl + "patient/basic/add_dup/"+hospital_id+"", data, this.jwt());
  }
  patient_general_info_updated(data,loggedIdUserId) {
    return this.http.post(this.baseUrl + "patient/general/add/"+loggedIdUserId,data,this.jwt());
  }
  // patient_general_info_updated(data) {
  //   return this.http.post(this.baseUrl + "patient/general/add",data,this.jwt());
  // }
  addMethod(data, method_name = "") {
    return this.http.post(this.baseUrl + "patient/" + method_name + "/add",data,this.jwt());
  }
  maternal_add(data,loggedIdUserId) {
    return this.http.post(this.baseUrl + "patient/maternal/add/"+loggedIdUserId,data,this.jwt());
  }
  baby_git_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_git/add",data,this.jwt());
  }
  baby_appear_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_appears/add",data,this.jwt());
  }
  baby_resp_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_resp/add",data,this.jwt());
  }
  baby_cns_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_cns/add",data,this.jwt());
  }
  baby_cv_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_cv/add",data,this.jwt());
  }
  antibiotic_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_antibiotic/add",data,this.jwt());
  }
  baby_investigation_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_investigation/add",data,this.jwt());
  }
  final_add(data) {
    return this.http.post(this.baseUrl + "patient/baby_final/add",data,this.jwt());
  }
  search_patient(obj: any) {
    return this.http.post(this.baseUrl + "patient/like", obj, this.jwt());
  }
  jwt(token = null) {
    const httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/json"})
    };
    return httpOptions;
  }
  create_new_reading(data,loggedInUserId) {
    return this.http.post(this.baseUrl + 'patient/models/save/'+loggedInUserId,data);
  }
  get_new_reading(study_id){
    return this.http.get(this.baseUrl + 'patient/readingId/'+study_id,this.jwt());
  }
  search_patient_reading(str, hospital_id,branchId){
    return this.http.get(this.baseUrl + "patient/search/" + str +'/'+ hospital_id + '/' + branchId, this.jwt());
  }
  updateFormData(url,study_id,reading,data,loggedIdUserId){
    return this.http.put(this.baseUrl+url+study_id+'/'+reading+'/'+loggedIdUserId,data,this.jwt());
  }
  getLastReadingData(study_id){
    return this.http.get(this.baseUrl + "patient/models/" + study_id , this.jwt());
  }
  updateBabyProfile(study_id,data,loggedIdUserId){
    return this.http.put(this.baseUrl + "patient/update/babyProfile/" + study_id +'/'+loggedIdUserId,data ,this.jwt())
  }
  updateMaternalProfile(study_id,data,loggedIdUserId){
    return this.http.put(this.baseUrl + "patient/update/motherProfile/" + study_id +'/'+loggedIdUserId,data, this.jwt())
  }
  addBranch(data,hospitalId){
    return this.http.post(this.baseUrl +'hospitalBranch/register/' + hospitalId , data, this.jwt());
  }
  // getHospitalBranches(hospitalId){
  //   return this.http.get( this.baseUrl + 'hospitalBranch/branches/' + hospitalId , this.jwt());
  // }
  getHospitalBranches(hospitalId,searchText){
    return this.http.get( this.baseUrl + 'hospitalBranch/branches/' + hospitalId+'?searchText='+searchText , this.jwt());
  }
  addRole(data,hospitalId, hospitalBranchId){
    return this.http.post(this.baseUrl +'hospitalBranch/role/'+ hospitalId +'/'+ hospitalBranchId , data, this.jwt());
  }
  getBrancheRole(hospitalId, hospitalBranchId){
    return this.http.get( this.baseUrl+ 'hospitalBranch/role/' + hospitalId +'/'+ hospitalBranchId , this.jwt());
  }
  removeBranchRole(hospital_branch_role_id) {
    return this.http.delete(this.baseUrl + 'hospitalBranch/role/' + hospital_branch_role_id, this.jwt());
  }
  updateHospitalRole(hospitalId, hospitalBranchId,roleId,data){
    return this.http.put(this.baseUrl + 'hospitalBranch/role/' + hospitalId+'/'+hospitalBranchId+'/'+roleId,data, this.jwt());
  }
  updateHospitalSpeciality(hospitalId, hospitalBranchId,specialityId,data){
    return this.http.put(this.baseUrl + 'hospitalBranch/speciality/' + hospitalId+'/'+hospitalBranchId+'/'+specialityId,data, this.jwt());
  }
  addSpeciality(data,hospitalId, hospitalBranchId){
  return this.http.post(this.baseUrl +'hospitalBranch/speciality/'+ hospitalId +'/'+ hospitalBranchId , data, this.jwt());
  }
  getSpeciality(hospitalId, hospitalBranchId){
    return this.http.get( this.baseUrl + 'hospitalBranch/speciality/' + hospitalId +'/'+ hospitalBranchId , this.jwt());
  }
  removeSpeciality(hospital_branch_speciality_id) {
    return this.http.delete(this.baseUrl + 'hospitalBranch/speciality/' + hospital_branch_speciality_id, this.jwt());
  }
  adsStaff(hospitalId,branchId,data,userType){
    return this.http.post(this.baseUrl +'hospitalStaff/addStaff/'+ hospitalId +'/'+ branchId +'?userType='+userType , data, this.jwt());
  }
  getStaff(hospitalId,branchId,start,limit,searchtext,flag){
    return this.http.get(this.baseUrl+'hospitalStaff/getStaff/'+ hospitalId +'/'+ branchId+'/'+start+'/'+limit+'/'+flag+'?searchText='+searchtext , this.jwt());
  }
  getStaffCounts(hospitalId,branchId,searchText,flag){
    return this.http.get(this.baseUrl +'hospitalStaff/getStaffCount/'+ hospitalId +'/'+ branchId+'/'+flag+'?searchText='+searchText, this.jwt());
  }
  updateStaff(hospitalId,branchId,staffId,data){
    return this.http.put(this.baseUrl+'hospitalStaff/updateStaff/'+hospitalId+'/'+branchId+'/'+staffId,data,this.jwt())
  }
  updateUserPermission(hospitalId, branchId, data) {
    return this.http.put(this.baseUrl+'hospitalStaff/update/staffPermission/'+hospitalId+'/'+branchId+'/',data,this.jwt())
  }
  addMedicalRecord(hospitalId, branchId, data) {
    return this.http.post(this.baseUrl +'patient/medicalRecord/'+hospitalId+'/'+branchId, data, this.jwt());
  }
  getMedicalRecords(hospitalId,branchId,page,limit,searchText,activeFlag,staffID){
    return this.http.get(this.baseUrl +'patient/medicalRecord/'+hospitalId+'/'+branchId+'/'+staffID+'/'+page+'/'+limit+'/'+activeFlag+'?searchText='+searchText, this.jwt());
  }
  getMedicalRecordsCount(hospitalId,branchId,searchText,activeFlag, staffID){
    return this.http.get(this.baseUrl +'patient/medicalRecordCount/'+hospitalId+'/'+branchId+'/'+ staffID +'/'+activeFlag+'?searchText='+searchText, this.jwt());
  }
  updateMedicalRecord(study_id, patient_id,hospitalId,branchId, userId, data){
    return this.http.put(this.baseUrl+'patient/medicalRecord/'+study_id+'/'+patient_id+'/'+hospitalId+'/'+ branchId + '/' + userId, data,this.jwt())
  }
  getMyProfile(id){
    return this.http.get(this.baseUrl + "hospital/hospitalProfile/" + id , this.jwt());
  }
  getStaffProfile(id){
    return this.http.get(this.baseUrl + "hospitalStaff/staffProfile/" + id , this.jwt());
  }
  getReferralProfile(id){
    return this.http.get(this.baseUrl + "hospitalStaff/getReferralProfile/" + id , this.jwt());
  }
  updateHospitalProfile(data,hospitalId){
    return this.http.put(this.baseUrl + "hospital/updateHospitalProfile/" + hospitalId , data,this.jwt());
  }
  updateStaffProfile(data,staffId){
    return this.http.put(this.baseUrl + "hospitalStaff/updateStaffProfile/" + staffId , data,this.jwt());
  }
  updateReferralProfile(data,referralId){
    return this.http.put(this.baseUrl + "hospitalStaff/updateReferralProfile/" + referralId , data,this.jwt());
  }
  addReferralDoctor(hospitalId,branchId,data){
    return this.http.post(this.baseUrl +'hospitalStaff/addReferralDoctor/'+ hospitalId +'/'+ branchId , data, this.jwt());
  }
  getReferralDoctors(hospitalId,branchId,page,limit,searchText){
    return this.http.get(this.baseUrl+'hospitalStaff/ReferralDoctor/'+hospitalId+'/'+branchId+'/'+page+'/'+limit+'?searchText='+searchText, this.jwt());
  }
  getReferralDoctorRecordsCount(hospitalId,branchId,searchText){
    return this.http.get(this.baseUrl +'hospitalStaff/ReferralDoctorCount/'+hospitalId+'/'+branchId+'?searchText='+searchText, this.jwt());
  }
  getBranchProfileInfo(branchId){
    return this.http.get(this.baseUrl +'hospitalBranch/hospitalBranchProfile/'+branchId, this.jwt());
  }
  updateBranchProfile(data,branchId){
    return this.http.put(this.baseUrl + "hospitalBranch/updateHospitalBranchProfile/" + branchId , data,this.jwt());
  }
  getHospitalList(referralDoctorId,start,limit,searchText){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralHospital/'+referralDoctorId+'/'+start+'/'+limit+'?searchText='+searchText, this.jwt());
  }
  getHospitalListCount(searchText){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralHospitalCount'+'?searchText='+searchText, this.jwt()
  );
  }
  updateSubscriptionStatus(referralDoctorId,hospitalId,newStatusObj){
    return this.http.put( this.baseUrl +'hospitalStaff/updateStatus/'+hospitalId+'/'+referralDoctorId,newStatusObj, this.jwt());
  }
  getRegisteredReferralDoctorRecordsCount(hospitalId,searchText){
    return this.http.get( this.baseUrl +'hospital/getRefferalCount/'+hospitalId+'?searchText='+searchText, this.jwt());
  }
  getRegisteredReferralDoctors(hospitalId,start,limit,searchText){
    return this.http.get( this.baseUrl +'hospital/getRegisteredRefferal/'+hospitalId+'/'+start+'/'+limit+'?searchText='+searchText, this.jwt());
  }
  getStaffUsers(hospitalId){
    return this.http.get( this.baseUrl +'hospitalStaff/getStaff/'+hospitalId, this.jwt());
  }
  sendMessage(senderId,recieverId,textMessage){
    return this.http.post(this.baseUrl +'hospital/sendMessage/'+ senderId +'/'+ recieverId , textMessage, this.jwt()); 
  }
  getHospitalAndBranchAdmins(userId){
    return this.http.get( this.baseUrl +'hospital/getStaffAdmin/'+userId, this.jwt());
  }
  getMessages(senderId,recieverId){
    return this.http.get( this.baseUrl +'hospital/getMessage/'+senderId+'/'+recieverId, this.jwt());
  }
  getHospitalReferralDoctors(hospitalId){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralStaff/'+hospitalId, this.jwt());
  }
  getReferralHospitalAdmins(referralId){
    return this.http.get( this.baseUrl +'hospital/getReferralAdmin/'+referralId, this.jwt());
  }
  updateReadStatus(senderId,recieverId){
    return this.http.put( this.baseUrl +'hospital/markMessageRead/'+senderId+'/'+recieverId, this.jwt());
  }
  getReferralStaffList(referralId){
    return this.http.get( this.baseUrl +'hospitalStaff/referralStaff/'+referralId, this.jwt());
  }
  getAllBranchStaffs(staffId){
    return this.http.get( this.baseUrl +'hospitalStaff/staff/'+staffId, this.jwt());
  }
  getStaffReferralDoctrs(staffId){
    return this.http.get( this.baseUrl +'hospitalStaff/staffReferral/'+staffId, this.jwt());
  }
  getBranchStaffUsers(hospitalBranchId){
    return this.http.get( this.baseUrl +'hospitalStaff/getBranchStaff/'+hospitalBranchId, this.jwt());
  }
  getReferralSpeciality(){
    return this.http.get( this.baseUrl +'hospitalStaff/getRefferalSpeciality', this.jwt());
  }
  getHospitalAdminDashboardData(hospitalId,hospitalBranchId,userType){
    return this.http.get( this.baseUrl +'hospital/getDashBoardDetail/'+hospitalId+'?hospitalBranchId='+hospitalBranchId+'&userType='+userType, this.jwt());
  }
  getStaffDashboardData(staffId){
    return this.http.get( this.baseUrl +'hospitalStaff/getDashBoardDetail/'+staffId, this.jwt());
  }
  getReferralDashboardData(referralId){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralDashBoardDetail/'+referralId, this.jwt());
  }
  getStaffBranches(staffId){
    return this.http.get( this.baseUrl +'hospitalStaff/getStaffBranches/'+staffId, this.jwt());
  }
  getPanelReferralDoctors(hospitalId,staffId){
    return this.http.get( this.baseUrl +'hospital/getAllReferralDoctors/'+staffId, this.jwt());
  }

  resetPassword(data){
    return this.http.post( this.baseUrl +'resetPassword',data, this.jwt());
  }

  sendResetPasswordEmail(data){
    return this.http.post( this.baseUrl +'forgotPassword',data, this.jwt());
  }

  sendForOpinion(branchId,staffId,data){
    return this.http.post(this.baseUrl +'hospitalStaff/staffReferral/'+ staffId +'/'+ branchId , data, this.jwt()); 
  }

  getReferralOpinonList(referralId,start,limit){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralDetail/'+referralId+'/'+start+'/'+limit, this.jwt());
  }

  saveOpinion(staffReferralId,data){
    return this.http.post(this.baseUrl +'hospitalStaff/sendOpinion/'+ staffReferralId , data, this.jwt());
  }

  getOpinions(studyId){
    return this.http.get( this.baseUrl +'hospitalStaff/getReferralOpinion/'+studyId, this.jwt());
  }
  getScore(studyId,reading,userTypeId){
    return this.http.get( this.baseUrl +'patient/getScore/'+studyId+'/'+reading+'?hospitalType='+userTypeId, this.jwt());
  }
  uploadFile(formData){
    return this.http.post(this.baseUrl +'hospitalStaff/upload', formData, this.mulipartJwt());
  }

  mulipartJwt(token = null) {
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "multipart/form-data",
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return httpOptions;
  }

  downloadReferralAttachmentFile(referralFileId){
    return this.http.get( this.baseUrl +'hospitalStaff/downloadFile/'+referralFileId,{
      observe: 'response', responseType: 'blob'
    });
  }

  getReferralOpinonListCount(referralId){
    return this.http.get( this.baseUrl +'hospitalStaff/referralDetailCount/'+referralId, this.jwt());
  }

  downloadBmrReport(bmrNo,reading){
    return this.http.get( this.baseUrl +'patient/downloadReport/'+bmrNo+'/'+reading,{
      observe: 'response', responseType: 'blob'
    });
  }

  updateBranch(data,hospitalBranchId){
    return this.http.put(this.baseUrl + "hospitalBranch/" + hospitalBranchId , data,this.jwt());
  }

  getStates(){
    return this.http.get( this.baseUrl +'hospital/statelist', this.jwt());
  }

  ashaPhcSignup(data){
    return this.http.post(this.baseUrl +'hospital/signUp/aasha', data, this.jwt()); 
  }

  createAshaPatient(data){
    return this.http.post(this.baseUrl +'patient/create', data, this.jwt());
  }

  getHealthParameters(studyId){
    return this.http.get( this.baseUrl +'hospitalStaff/aasha/'+studyId, this.jwt());
  }

  getAshaBMRRecords(start,limit,ashaUserId,searchText,userTypeId){
    return this.http.get( this.baseUrl +'patient/aashaBaby/'+ashaUserId+'/'+start+'/'+limit+'?searchText='+searchText+'&hospitalType='+userTypeId, this.jwt());
  }

  getAshaBMRCounts(ashaUserId,searchText,userTypeId){
    return this.http.get( this.baseUrl +'patient/aashaBabyCount/'+ashaUserId+'?searchText='+searchText+'&hospitalType='+userTypeId, this.jwt());
  }

  getAllRegisteredReferralDoctors(){
    return this.http.get( this.baseUrl +'hospitalStaff/getAashaReferral', this.jwt());
  }

  getAshaPhcOpinionCount(referralId,userType){
    return this.http.get( this.baseUrl +'hospitalStaff/aashaReferralDetailCount/'+referralId+'?hospitalType='+userType, this.jwt());
  }

  getAshaPhcOpinion(referralId,start,limit,userType){
    return this.http.get( this.baseUrl +'hospitalStaff/aashaReferralDetail/'+referralId+'/'+start+'/'+limit+'?hospitalType='+userType, this.jwt());
  }

  getAshaPhcViewOpinion(studyId){
    return this.http.get( this.baseUrl +'hospitalStaff/getAashaReferralOpinion/'+studyId, this.jwt());
  }


  // getOrderReport(filters){
  //   return this.httpClient.post(API_ROUTES.GET_ORDER_REPORT(), filters,{
  //     responseType: ResponseContentType.Blob | ResponseContentType.Json
  //   }) 
  //   .map(result => {
  //     return{
  //       response:result,
  //       data: <Blob>result.blob()
  //     };
  //   })
  // }

  // uploadFile(fileToUpload:File,id:number) {
  //   this.result= JSON.parse(localStorage.getItem('authUser'));
  //   this.user_id=this.result['user_id'];
  //   const formdata: FormData = new FormData();
  //   formdata.append('file', fileToUpload);
  //  let headers = new Headers({'Content-Type': 'multipart/form-data'});
  //  return this.http.post(this.uploadBaseUrl+'excel/upload/'+this.user_id+'/',formdata)
  //        .map(data => {
  //        const rootObject =  new Rootobject().deserialize(data);
  //         // console.log( "service:"+JSON.stringify(rootObject));
  //         return rootObject;
  //      })
  //        .catch(this.handleError);
  // }
}