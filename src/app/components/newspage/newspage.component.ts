import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
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
    GetImagesService,   
  ],
  encapsulation: ViewEncapsulation.None
})

export class NewspageComponent implements OnInit {
  serverURL: string;
  public LANGUAGE : any = LANG_VI;
  p: number = 1;
  collection: any[] = [];  
	page = 'one';

  public introData: SafeHtml;
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
  NewsData;
  IsNewsData;
  SubFirstData;
  imageNew;
  eventsURL;
  eventsData;
  eventsFirst = [];
  imageEvent;
  arrImage:any[] = [];
  newArrImage: any[]= [];
  //.........
  newItemData;
  //.........
  eventItemData;
  ImageEvent;

  EventsFirst: any;
  EventsSecond: any;
  EventsThird: any;
  newHeaderData: any;
  imageHeaderData: string;
  newsPageItems:any[] = [];
  public isVietnamese: boolean = true;

  constructor(
    private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
    private santized: DomSanitizer
  ) { 
    // Change language
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
         this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
         this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }

      if (data.idFirst !== undefined){
        this.eventsURL = this._getDataService.getNewsURL();
        this._http.get(this.eventsURL).subscribe(data =>{
          this.eventsData = data;
          for(var i = 0; i < this.eventsData.length; i++){
            this.EventsFirst = this.eventsData[this.eventsData.length -1];
          } 
          $('#article').hide();
          $('#new-article').show();
          window.scrollTo(0, 0);      
        });
      }

      if (data.id !== undefined){
        let jlptItemDataURL = this._getDataService.getNewsItemURL(data.id);
        this._http.get(jlptItemDataURL).subscribe(data => {
          this.newItemData = data;
          $('#FirstNews').hide();
        });
        window.scrollTo(0, 0);
        
      }
    });
    //get data newspage for card
    this.newURL = this._getDataService.getNewsURL();
    this._http.get(this.newURL).subscribe(data =>{
      this.newData = data;
      this.NewsData = this.newData.slice().reverse()
      this.IsNewsData = this.NewsData.slice(1, this.NewsData.length) 
      for(var k = 0; k < this.IsNewsData.length; k++){
        this.imageNew = this.IsNewsData[k].Thumbnail;
        this.arrImage[k] = this.serverURL + this.imageNew.url;     
      }

    });

    //First card
    this.eventsURL = this._getDataService.getNewsURL();
    this._http.get(this.eventsURL).subscribe(data =>{
      this.eventsData = data;
      for(var i = 0; i < this.eventsData.length; i++){
      this.eventsFirst = this.eventsData[this.eventsData.length -1];
      this.ImageEvent = this.serverURL + this.eventsData[this.eventsData.length -1].Thumbnail.url;      
      }       
    });

   }
   // display acticrle news
   OnChangeNews(id){
    let jlptItemDataURL = this._getDataService.getNewsItemURL(id);
    this._http.get(jlptItemDataURL).subscribe(data => {
      this.newItemData = data;
      console.log(this.newItemData);  
    });
    window.scrollTo(0, 0);
    $('#FirstNews').hide();
   }
  //display first acticrle 
  OnChangeActicrles(){
    this.eventsURL = this._getDataService.getNewsURL();
    this._http.get(this.eventsURL).subscribe(data =>{
      this.eventsData = data;
      for(var i = 0; i < this.eventsData.length; i++){
      this.EventsFirst = this.eventsData[this.eventsData.length -1];
      //this.imageEvent = this.serverURL + this.evnetsData[0].Thumbnail.url;     
      }       
    });
    $('#article').hide();
    $('#new-article').show();
    window.scrollTo(0, 0);
  }
  ngOnInit() {
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