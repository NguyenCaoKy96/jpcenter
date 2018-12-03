import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';
import { ActivatedRoute } from '@angular/router';

// Language
import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';

@Component({
  selector: 'app-exam-point',
  templateUrl: './exam-point.component.html',
  styleUrls: ['./exam-point.component.css']
})
export class ExamPointComponent implements OnInit {

  public LANGUAGE : any = LANG_VI;
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
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
  	// Title
  	this._titleService.setTitle('Điểm thi');

     //get data download
     this.academicsURL = this._getDataService.getAcademicsURL();
    this._http.get(this.academicsURL).subscribe(data =>{
      this.academics = data;
      console.log(this.academics );
      for(var i = 0; i < this.academics.length; i++){
        this.link = this.academics[0].Upload_Link;
        console.log(this.link)
      }
      
    });
  	//get data openings

  	 // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === "Học vụ") {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
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
