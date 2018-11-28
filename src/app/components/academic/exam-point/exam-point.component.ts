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
	openingURL: string;
	openingSchedule: any;

	carouselBanner: any;
    imageURLs: any;
    homeImages: any[] = [];
    homeImagesURL: { [key: number]: string } = [];
    serverURL: any;
    data: any;
    eventURL: any;
    eventData: any;
    Event1;


  constructor(private titleService: Title,
  	private _titleService: Title,
  	private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService) { }

  ngOnInit() {
  	// Title
  	this._titleService.setTitle('Điểm thi');
  	//get data openings
  	this.openingURL = this._getDataService.getOpeningScheduleURL();
  	this._http.get(this.openingURL).subscribe(data =>{
  		this.openingSchedule = data;
  	});

  		// Slide images
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getFromServer();
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
       //   $('#dowload').click(function(e){
       //     this.url = 'http://10.1.0.66:1337/jobs' ;
       //     $.get(this.url, function(data, status, jqXHR){
       //       console.log(data);
       //       var txt ='';
       //       $(data).find().each(function(i, val){
       //         console.log($(val).text());
       //         txt += $(this).text();
       //       });
       //     });
        
       //     });
       //   });
      
    $(document).ready(function(){
      const Url = 'http://10.1.0.66:1337/jobs';
      $('#dowload').click(function(){
        $.get(Url, function(data, status){
          console.log(data);
        });
      });
    }); 
  }

}
