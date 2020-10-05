import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class Util {
  private patientUpdate = new Subject<any>();
  private userInfo = new Subject<any>();
  setPatient() {
    this.patientUpdate.next();
  }

  clearMessages() {
    this.patientUpdate.next();
  }

  getPatient(): Observable<any> {
    return this.patientUpdate.asObservable();
  }

  setUserInfo(obj) {
    this.userInfo.next(obj);
  }

  getUserInfo(): Observable<any> {
    return this.userInfo.asObservable();
  }
}
