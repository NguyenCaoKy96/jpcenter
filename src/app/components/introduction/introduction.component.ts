import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

// Title
import { Title } from '@angular/platform-browser';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

//import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class IntroductionComponent implements OnInit {

  TrungtamNhatBan = 'one';
  public page = 'one';

  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;
  introductionsData;
  introductionItemData;
  introductionURL: string;
  isLoading: boolean = true;
  headerURL: string;
  headerData: any;
  introduction: any;
  lang: string ;

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private router:Router, 
    private route: ActivatedRoute
  ) {
    // get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
      this.introductionsData = data;
      console.log(this.introductionsData)
      //console.log('introduction', data[0].id);
      this.onChangeIntroduction(this.introductionsData[0].id);
    });
   
  }  
  ngOnInit() {
    // Get language
    this.route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });

    this.http.get(this.headerURL).subscribe(data => {
      this.data = data;
    }); 

    //Get Images data
    this.carouselBanner = this._getImageService.carouselBanner;

    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Giới thiệu") {
          for (var k = 0; k < this.homeImages[i].Images.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
          }
        }
      }
    });

    //Get Header data
    this.http.get(this.headerURL).subscribe(data => {
      this.headerData = data;
      for(var i=0; i<this.headerData.length; i++) {
        if(this.headerData[i].Slug === "/gioi-thieu") {
          this.introduction = this.headerData[i];
          //console.log(this.headerData[i]);
        }
      }
    });

    //Get Breadcrumbs data
    
  }

  onChangeIntroduction(id, evt?) {
    let introductionItemURL = this._getDataService.getIntroducesItemURL(id);
    this.http.get(introductionItemURL).subscribe(data => {
      this.introductionItemData = data;
      //console.log('gioi thieu', data);
      this.isLoading = false;
    });
    $('.left-item').removeClass('active-link');
    if (evt) {
      $(evt.target).addClass('active-link');
    }
  }
  

  afterCarouselViewedFn(data) { };

  onmoveFn(data: NgxCarouselStore) { };

}
