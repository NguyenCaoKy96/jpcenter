import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../../services/get-data/get-data.service';
@Component({
  selector: 'app-introduction-one',
  templateUrl: './introduction-one.component.html',
  styleUrls: ['./introduction-one.component.css'],
  providers: [GetDataService],
  
})
export class IntroductionOneComponent implements OnInit {

  public introductionsData;
         introductionURL:string;
         introductionsData0;
         html;
         

   

  constructor(private http: HttpClient,
              private _getDataService: GetDataService) 
 {
 	 

// let contentUrl = this.getData();
//     this.http.get(contentUrl).subscribe(data => {
//       this.introductionsData = data[0];
//       console.log('gioi thieu', this.introductionsData);
//     });

//   }
//    getData(){
//       return 'http://10.1.0.66:1339/contents';

//  }
}

  ngOnInit() {
    // get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[0];
     console.log('introductionsData0', this.introductionsData);
    });
  
    
    
}
  


}
