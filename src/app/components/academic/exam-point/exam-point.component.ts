import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';
@Component({
  selector: 'app-exam-point',
  templateUrl: './exam-point.component.html',
  styleUrls: ['./exam-point.component.css']
})
export class ExamPointComponent implements OnInit {
	academicsURL: string;
  academics:any;

	carouselBanner: any;
    imageURLs: any;
    homeImages: any[] = [];
    homeImagesURL: { [key: number]: string } = [];
    serverURL: any;
    data: any;
    eventURL: any;
    eventData: any;
    Event1;
    link;


  constructor(private titleService: Title,
  	private _titleService: Title,
  	private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService) { }

  ngOnInit() {
  	// Title
  	this._titleService.setTitle('Điểm thi');

     //get data download
     this.academicsURL = this._getDataService.getAcademicsURL();
    this._http.get(this.academicsURL).subscribe(data =>{
      this.academics = data;
      console.log(this.academics );
      for(var i = 0; i < this.academics.length; i++){
        this.link = this.academics[0].Link;
        console.log(this.link)
      }
      
    });
  	//get data openings

  		// Slide images
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Cơ hội nghề nghiệp") {
          for (var k = 0; k < this.homeImages[i].Images.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
          }
        } 
      }
    });

    // dowload data
      
    // $(document).ready(function(){
    //   this.Url = 'http://10.1.0.66:1337/jobs' + this.image.url;
    //   $('#dowload').click(function(){
    //     $.get(this.Url, function(data, status){
    //       console.log(data);
    //     });
    //   });
    // }); 
  }

}
