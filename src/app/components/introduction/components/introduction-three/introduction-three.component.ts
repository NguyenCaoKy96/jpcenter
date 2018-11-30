import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../../services/get-data/get-data.service';
@Component({
  selector: 'app-introduction-three',
  templateUrl: './introduction-three.component.html',
  styleUrls: ['./introduction-three.component.css'],
  providers: [GetDataService],
})
export class IntroductionThreeComponent implements OnInit {
	public introductionsData;
         introductionURL:string;
         introductionsData2;

  constructor(private http: HttpClient,
              private _getDataService: GetDataService)
    {
     // get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[2];
     console.log('introductionsData2', this.introductionsData);
      

    });
       }

  ngOnInit() {
  }

}
