import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import { GetDataService } from './../../../../services/get-data/get-data.service';
import { default as LANG_VI } from '../../../../../lang/lang_vi';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { default as LANG_JP } from '../../../../../lang/lang_jp';
import { GetImagesService } from './../../../../services/get-image-slider/get-images.service';


// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Component({
  selector: 'app-introduction-five',
  templateUrl: './introduction-five.component.html',
  styleUrls: ['./introduction-five.component.css'],
   providers: [GetDataService],
})
export class IntroductionFiveComponent implements OnInit {

   public carouselBanner: NgxCarousel;
  imageURLs: any;
  sliderImages: any[] = [];
  sliderImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
	public introductionsData;
         introductionURL:string;
         introductionsData4;
         content:any;
         html:any;
         LANGUAGE: any = LANG_VI;

  constructor(
      private http: HttpClient,
      private _titleService: Title,
      private _getDataService: GetDataService,
      private _getImageService: GetImagesService,
      private _route: ActivatedRoute
   ) { 
      
      // get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[4];
     console.log('5', this.introductionsData);
      
    });
   }

  ngOnInit() {

   
     // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });
    
    this._titleService.setTitle(this.LANGUAGE.INTRODUCTION_PAGE);
    //console.log(this.LANGUAGE.EDUCATION_PROGRAM);

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.sliderImages = res;
      for (var i = 0; i < this.sliderImages.length; i++) {
        if (this.sliderImages[i].Name === "Giới thiệu") {
          for (var k = 0; k < this.sliderImages[i].Image.length; k++) {
            this.sliderImagesURL[k] = this.serverURL + this.sliderImages[i].Image[k].url;
          }
        }
      }
    });
  }

}
