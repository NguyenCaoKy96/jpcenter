import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class AcademicComponent implements OnInit {
	openingSchedule: any;
	openingURL: string;

	p: number = 1;
  collection: any[] = [];  
	page = 'one';

  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  AcademicsData ;
  AcademicsItemData = [] ;

  academicsURL: string;
  academics:any;
  lang: string;
  public isVietnamese: boolean = true;
  public LANGUAGE : any = LANG_VI;


  

  constructor(private titleService: Title,
  	private _titleService: Title,
  	private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute) { 

  	//Get data academic
  	this.academicsURL = this._getDataService.getAcademicsURL();
  	this._http.get(this.academicsURL).subscribe(data =>{
      this.academics = data;     
      this.onChangeAcademicsData(this.academics[0].id);
  	}); 
  }
  onChangeAcademicsData(id, evt?) {
    let AcademicsItemURL = this._getDataService.getAcademicsItemURL(id);
    this.http.get(AcademicsItemURL).subscribe(data => {
      this.AcademicsData = data;   
    });
  }
  ngOnInit() {

  	
    // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang ='vi';
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.lang ='jp';
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }

    });

     // Title 
     this._titleService.setTitle(this.LANGUAGE.ACADEMIC);

  	//get data openings
  	this.openingURL = this._getDataService.getOpeningScheduleURL();
  	this._http.get(this.openingURL).subscribe(data =>{
  		this.openingSchedule = data;
  	});

  	// Slide images
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Học vụ") {
          for (var k = 0; k < this.homeImages[i].Images.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
          }
        } 
      }
    });
  }

}
