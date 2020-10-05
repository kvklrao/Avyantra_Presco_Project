import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material";
import {NgxMaskModule} from 'ngx-mask'
import { BabyGitComponent } from './baby-git.component';
import { By } from '@angular/platform-browser';
import { DataService } from '../../shared/service/data.service';

export const routes: Routes = [
  {
    path: '',
    component: BabyGitComponent
  }
];

describe('BabyGitComponent', () => {
  let component: BabyGitComponent;
  let fixture: ComponentFixture<BabyGitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyGitComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule,
        MatIconModule,
        RouterTestingModule.withRoutes(routes),
        ToastrModule.forRoot(),
        NgxMaskModule.forRoot()],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Abdominal Distension field should be valid', () => {
    let abdomial_distension=component.babyGitForm.controls['abdominal_dystension'];
    expect(abdomial_distension.valid).toBeFalsy();

    abdomial_distension.setValue('Yes')
    expect(abdomial_distension.valid).toBeTruthy();
    //expect(abdomial_distension.getValue()).toContain('Yes','No','NA');
  });

  // it('frequency of stools field should be valid', () => {
  //   let fixture=TestBed.createComponent(BabyGitComponent);
  //   let component=fixture.debugElement.componentInstance;
  //   let app=fixture.debugElement.nativeElement;
  //   fixture.detectChanges();
  //   // let webcontrol=fixture.debugElement.nativeElement;
  //   let frequency_of_stools=component.babyGitForm.controls['frequency_of_stools'];
  //   // let  frequencyRadioControl=fixture.debugElement.query(By.css('input[name="Frequency"]')).nativeElement;
  //   let frequencyRadioControl=fixture.debugElement.query(By.css('#frequency_id')).nativeElement;

  //   frequencyRadioControl.click();
  //   expect(component.isStools).toBeFalsy();
  // });

  it('baby git form should be created on component load',()=>{
    let component=fixture.debugElement.componentInstance;
    spyOn(component,'createForm');
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalledTimes(1);
  })


});
