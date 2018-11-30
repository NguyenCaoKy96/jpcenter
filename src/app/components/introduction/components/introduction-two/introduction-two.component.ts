import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../../services/get-data/get-data.service';

@Component({
  selector: 'app-introduction-two',
  templateUrl: './introduction-two.component.html',
  styleUrls: ['./introduction-two.component.css'],
  providers: [GetDataService],
})
export class IntroductionTwoComponent implements OnInit {
	 public introductionsData;
         introductionURL:string;
         introductionsData1;

  constructor(private http: HttpClient,
              private _getDataService: GetDataService) {
               }

  ngOnInit() {
  	// get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[1];
     console.log('introductionsData1', this.introductionsData);
    });
  }

}
