import { Component, OnInit } from '@angular/core';
import { Title,DomSanitizer,SafeUrl } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';
import { ActivatedRoute } from '@angular/router';

// Language
import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class CalendarComponent implements OnInit {

  public LANGUAGE : any = LANG_VI;
  openingSchedule: any;
  openingURL: string;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  txtArea1;
  newQnuJapanURL: string;
  newQnuJapanData:any;
  imageQnuJapan: any[]=[];
  public isVietnamese: boolean = true;
  downloadImage: SafeUrl;
  lang: string;


  constructor(
    private titleService: Title,
    private _titleService: Title,
    private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
    private santized: DomSanitizer
    ) { } 

  ngOnInit() {
       // Title 
        // this._titleService.setTitle('Học vụ');
      
         // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang = 'vi';
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
        console.log(this.LANGUAGE);
      } else {
        this.lang = 'jp';
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
    });
   
      //get data images
        this.newQnuJapanURL = this._getDataService.getCoursesURL();
        this._http.get(this.newQnuJapanURL).subscribe(data =>{
        this.newQnuJapanData = data;
            for (var i = 0; i < this.newQnuJapanData[0].File_Upload.length; i++) {
             this.imageQnuJapan.push('http://10.1.0.66:1336' + this.newQnuJapanData[0].File_Upload[i].url);
              // this.downloadImage = this.santized.bypassSecurityTrustUrl('http://10.1.0.66:1336' + this.newQnuJapanData[i].File_Upload.url);
              console.log(this.imageQnuJapan);
             }
        });

    //get data schedule
  	this.openingURL = this._getDataService.getCoursesURL();
  	this._http.get(this.openingURL).subscribe(data =>{
  		this.openingSchedule = data;
  	});

 
    //
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
    })
  }
}
