import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { AppHelper } from '../../../shared/helper/app.helper';
import { ToastrModule } from "ngx-toastr";
import { HospitalAdminInfoComponent } from './hospital-admin-info.component';

describe('HospitalAdminInfoComponent', () => {
  let component: HospitalAdminInfoComponent;
  let fixture: ComponentFixture<HospitalAdminInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAdminInfoComponent ],
      imports: [
        HttpClientModule, ToastrModule.forRoot()],
      providers:[AppHelper]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminInfoComponent);
    component = fixture.componentInstance;
  //   let store = {};
  //   const mockLocalStorage = {
  //     getItem: (key: string): string => {
  //       return key in store ? store[key] : null;
  //     },
  //     setItem: (key: string, value: string) => {
  //       store[key] = `${value}`;
  //     },
  //     removeItem: (key: string) => {
  //       delete store[key];
  //     },
  //     clear: () => {
  //       store = {};
  //     }
  //   };
  //   spyOn(localStorage, 'getItem')
  //   .and.callFake(mockLocalStorage.getItem);
  // spyOn(localStorage, 'setItem')
  //   .and.callFake(mockLocalStorage.setItem);
  // spyOn(localStorage, 'removeItem')
  //   .and.callFake(mockLocalStorage.removeItem);
  // spyOn(localStorage, 'clear')
  //   .and.callFake(mockLocalStorage.clear);
  //   localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
  let store = {};
  spyOn(window.localStorage, 'getItem').and.callFake(function() {
    return JSON.stringify({"test":"test"});
  });
   spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key]=value;
    });
    fixture.detectChanges();
  });

  it('should create local storage', () => {
    localStorage.setItem("login_hospital",JSON.stringify({"username":"getwell","email":"get@yahoo.com","user_type":"Hospital","id":92,"hospital_name":"getwell","hospital_branch_name":"getwell indore","hospital_branch_id":59}))
    expect( component ).toBeTruthy();
  });
});
