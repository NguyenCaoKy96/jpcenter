import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../../services/get-data/get-data.service';

@Component({
  selector: 'app-introduction-five',
  templateUrl: './introduction-five.component.html',
  styleUrls: ['./introduction-five.component.css'],
   providers: [GetDataService],
})
export class IntroductionFiveComponent implements OnInit {
	public introductionsData;
         introductionURL:string;
         introductionsData4;
         content:any;
         html:any;

  constructor(private http: HttpClient,
              private _getDataService: GetDataService) 
  { // get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[4];
     console.log('5', this.introductionsData);
      
    });
 }

  ngOnInit() {
  }

}
