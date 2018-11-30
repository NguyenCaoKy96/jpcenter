import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../../services/get-data/get-data.service';
import * as $ from 'jquery';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-introduction-four',
  templateUrl: './introduction-four.component.html',
  styleUrls: ['./introduction-four.component.css'],
  providers: [GetDataService, NgbModalConfig, NgbModal],
})
export class IntroductionFourComponent implements OnInit {
	 public introductionsData;
         introductionURL:string;
         introductionsData3;
         PersonnelURL;
         PersonnelData;
         personDetail;


  constructor( private http: HttpClient,
    config: NgbModalConfig, private modalService: NgbModal,
              private _getDataService: GetDataService) 
  { 
    config.backdrop = 'static';
    config.keyboard = false;
  	// get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[3];
     console.log("4", this.introductionsData);
    });
     this.PersonnelURL=this._getDataService.getpersonnelURL();
     this.http.get(this.PersonnelURL).subscribe(data=>{
     this.PersonnelData=data;
     console.log('personal',this.PersonnelData);

     })
  }

  ngOnInit() {
  }

  onChangePerson(person, content){
    console.log('person', person);
    this.personDetail = person;
    //open popup here
    $("#btnModal").click();
   
  }

  open(content) {
    this.modalService.open(content);
  }

}
