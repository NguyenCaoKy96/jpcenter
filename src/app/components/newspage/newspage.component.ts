import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-newspage',
  templateUrl: './newspage.component.html',
  styleUrls: ['./newspage.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class NewspageComponent implements OnInit {
  serverURL: string;
  public LANGUAGE : any = LANG_VI;
  p: number = 1;
  collection: any[] = [];  
	page = 'one';

  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  data: any;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;

  // Article variable
  newestArticle: any;
  newsURL: string;
  shortArticleContent: string;

  // Public newspage card\
  shortNewspageContent: string;
  newsPageContent: any;
  newsPageData;
  newsPageURL: string;

  figure: any;
  img: any;
  imagePageData:any;
  newsName:any;
  newsLocation:any;
  newSlug:string;
  //...........
  newURL;
  newData;
  imageNew;
  evnetsURL;
  evnetsData;
  eventsFirst = [];
  imageEvent;
  arrImage:any [] = [];

  newHeaderData: any;
  imageHeaderData: string;
  newsPageItems:any[] = [];

  constructor(
    private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) {
      //get data newspage for card
      this.newURL = this._getDataService.getNewsURL();
      this._http.get(this.newURL).subscribe(data =>{
        this.newData = data;
        for(var k = 0; k < this.newData.length; k++){
          this.imageNew = this.newData[k].Thumbnai;
          for(var i = 0; i < this.newData[k].Thumbnai.length; i++){
            this.arrImage[i] = this.serverURL + this.newData[k].Thumbnai[i].url;          
          }  
          console.log(this.imageNew);        
        }     
     });

       //get data event for card
       this.evnetsURL = this._getDataService.getEventsURL();
       this._http.get(this.evnetsURL).subscribe(data =>{
         this.evnetsData = data;
         for(var i = 0; i < this.evnetsData.length; i++){
         this.eventsFirst = this.evnetsData[0];
         this.imageEvent = this.serverURL + this.evnetsData[0].Thumbnai.url;      
         }       
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

    // Pagin
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this._titleService.setTitle(this.LANGUAGE.NEWS_AND_EVENTS);

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === this.LANGUAGE.NEWS_AND_EVENTS) {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
          }
        }
      }
    });

    //this.getNewestArticle();
  }

  onmoveFn(data: NgxCarouselStore) { };

  // Get newest article
  // getNewestArticle() {
  //   var tempArticle: any;
  //   var tempNewestArticleIndex: number;
  //   var longContent: string;
  //   var maxShortContentLength: number = 200;
  //   var isPublished: boolean = false;

  //   this.newsURL = this._getDataService.getNewsURL();
  //   this._http.get(this.newsURL).subscribe(data => {
  //     tempArticle = data;
  //     this.newestArticle = tempArticle[tempArticle.length - 1];
  //     for (var i = tempArticle.length - 1; i>=0; i--) {
  //       if(this.newestArticle.Status === "Published") {
  //         isPublished = true;
  //         longContent = this.newestArticle.Content;
  //         this.shortArticleContent = longContent.substr(0, maxShortContentLength);
  //         this.shortArticleContent = this.shortArticleContent.substr(0, Math.min(this.shortArticleContent.length, this.shortArticleContent.lastIndexOf(" ")));
  //         this.figure = $(longContent).find('img:first').prevObject[1];
  //         var a = $(this.figure).clone();
  //         $('figure', a).remove();
  //         $('.thumnail').append(a.html());
  //         break;
  //       } else {
  //         isPublished = false;
  //         this.newestArticle = tempArticle[tempArticle.length - i];
  //       }
  //     }
  //   });
  //} 
}