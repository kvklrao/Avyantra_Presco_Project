import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../service/common/common.service';
@Injectable()
export class AppHelper {
    
    constructor(public toasty:ToastrService,private commonService:CommonService){

    }

    stateList=[];

    ngbModalOptions: NgbModalOptions = {
        backdrop : 'static',
        keyboard : false,
        size:'lg'
  };

  ngbModalSmallOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size:'sm'
};

ngbModalOpinionOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    windowClass:'myCustomModalClass',
};

ngbModalChatOptions: NgbModalOptions = {
    // backdrop : 'static',
    keyboard : false,
    windowClass:'myCustomChatModalClass',
};
   /**
    * @function as @return succcess
    */
    public success(response){
      //. debugger
      let self = this;  
        if(response.hasOwnProperty('status') && parseInt(response['status']) == 200  ){
          return true;
        } else {             
            return false;
        }
    }

   /**
    * @function as @return errorHandler
    */
    public errorHandler(response){
        let self = this;  
        if(response.hasOwnProperty('status') && parseInt(response['status']) != 200  ){
            if(response.hasOwnProperty('error')){
                if(response.hasOwnProperty('message') && response['message']!=null){
                    self.toasty.error(response['message'],'ERROR');
                }
                else{
                    self.toasty.error('Error','ERROR');
                }
            }
            else{
                self.toasty.error('Error','ERROR');
            }
        }
    }


   /**
    * @function as @return recordNotFound
    */
   public noRecordsFound(response){
     let self = this;  
    if(response.hasOwnProperty('status') && parseInt(response['status']) != 200){
        self.errorHandler(response);
      } else {
         self.errorHandler(response);
      }
   }

      /**
    * @function as @return blobSuccessResponse
    */
   public blobSuccessResponse(response,fileName){
    //    debugger;
    if(response['body']['type']!="application/json"){
        // let contentDisposition=response['headers']['_headers'].get('content-disposition');
        var attachmentName=fileName;
        // if (contentDisposition[0] && contentDisposition[0].indexOf('attachment') !== -1) {
        //   var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        //   var matches = filenameRegex.exec(contentDisposition[0]);
        //   if (matches != null && matches[1]) { 
        //     attachmentName = matches[1].replace(/['"]/g, '');
        //   }
        // }
        var url = window.URL.createObjectURL(response.body);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download =attachmentName;
        a.click();
        window.URL.revokeObjectURL(url);
         a.remove();
        this.toasty.success("File Downloaded Successfully",'Success');
   }
}

 /**
    * @function as @return blobErrorResponse
    */
   public blobErrorResponse(response){
    const fr = new FileReader();
    var errorMessage=null;
    fr.onloadend = (e => {
      let errorBlob=(fr.result);
      errorMessage=JSON.parse(errorBlob.toString());
        this.errorHandler(errorMessage);
      });
    fr.readAsText(response.data, 'utf-8');
   }


   public getColorCode(score){
    //    if(score<=50){
    //        if(score>30){
    //             if(score>30 && score<=40)
    //             return '#aeaeae';
    //             else
    //             return '#9d9d9d';
    //        }else{
    //             if(score>0 && score<=10)
    //             return '#ededed';
    //             if(score>10 && score<=20)
    //             return '#dadada';
    //             else
    //             return '#c3c3c3';
    //        }
    //    }else{
    //         if(score>80){
    //             if(score>80 && score<=90)
    //             return '#b96565';
    //             else
    //             return '#ff5050';
    //         }else{
    //             if(score>50 && score<=60)
    //             return '#877878';
    //             if(score>60 && score<=70)
    //             return '#705f5f';
    //             else
    //             return '#8a5757';
    //         }
    //    }
    if(score>=0 && score<=5){
        return '#00b300';
    }
    if(score>5 && score<=8){
        return '#FFA500';
    }
    if(score>8 && score<=10){
      return '#ff5050';
    }
   }

   public getStates(){
       this.commonService.getStates().subscribe(result=>{
           if(this.success(result)){
               this.stateList=result['response'];
           }
       })
       return this.stateList;
   }




 }