import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import * as $ from 'jquery';

 
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  CkNewsData : SafeHtml;
  JapanCkNewsData : SafeHtml;
  SubFirstData;
  imageNew;
  eventsURL;
  eventsData;
  eventsFirst = [];
  CkeventsFirst:SafeHtml = [];
  JapanCkeventsFirst:SafeHtml = [];
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
  lang: string;

 eventName;

  constructor(
    private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
    private santized: DomSanitizer,
    private router : Router,
    private location: Location
  ) { 
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
      if (data.idFirst !== undefined){
        this.eventsURL = this._getDataService.getNewsURL();
        this._http.get(this.eventsURL).subscribe(data =>{
          this.eventsData = data;
          for(var i = 0; i < this.eventsData.length; i++){
          this.EventsFirst = this.eventsData[this.eventsData.length -1]; 
          this.CkeventsFirst = this.santized.bypassSecurityTrustHtml(this.EventsFirst.Content);  
          this.JapanCkeventsFirst = this.santized.bypassSecurityTrustHtml(this.EventsFirst.Japanese_Content);
          }      
        });
        this.newItemData = undefined;
        this.EventsFirst = undefined;
        this.router.navigate(['/','tin-tuc-su-kien'], {relativeTo: this._route, queryParams: { slug:data.idFirst,lang:this.lang == 'vi' ?'vi':'jp'}});                
      }
      $('#FirstNews').hide();

      if (data.id !== undefined){
        let jlptItemDataURL = this._getDataService.getNewsItemURL(data.id);
        this._http.get(jlptItemDataURL).subscribe(data => {
          this.newItemData = data;
          this.CkNewsData = this.santized.bypassSecurityTrustHtml(this.newItemData.Content);
          this.JapanCkNewsData = this.santized.bypassSecurityTrustHtml(this.newItemData.Japanese_Content);
        }); 
       this.router.navigate(['/','tin-tuc-su-kien'], {relativeTo: this._route, queryParams: { slug:data.id,lang:this.lang == 'vi' ?'vi':'jp'}});
      }
    });
    //get data news page for card
    this.newURL = this._getDataService.getNewsURL();
    this._http.get(this.newURL).subscribe(data =>{
      this.newData = data;
      this.NewsData = this.newData.slice().reverse();
      this.IsNewsData = this.NewsData.slice(1, this.NewsData.length);
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
   OnChangeNews(item){
    this.IsNewsData = this.NewsData.slice(1, this.NewsData.length);
    let jlptItemDataURL = this._getDataService.getNewsItemURL(item._id);
    this._http.get(jlptItemDataURL).subscribe(data => {
      let tempData = [];
      for(var i = 0; i < this.IsNewsData.length; i++){
        if(tempData.length < 3 && this.IsNewsData[i].id !== item.id){
          tempData.push(this.IsNewsData[i]);
        }
      }
      this.IsNewsData = tempData;
      for(var k = 0; k < this.IsNewsData.length; k++){
        this.imageNew = this.IsNewsData[k].Thumbnail;
        this.arrImage[k] = this.serverURL + this.imageNew.url;     
      }
      this.newItemData = data;
      this.CkNewsData = this.santized.bypassSecurityTrustHtml(this.newItemData.Content);
      this.JapanCkNewsData = this.santized.bypassSecurityTrustHtml(this.newItemData.Japanese_Content);
      this.router.navigate(['/','tin-tuc-su-kien'], {relativeTo: this._route, queryParams: { slug:item.Name,lang:this.lang == 'vi' ?'vi':'jp'}});
    });
    console.log(this.CkNewsData)
    this.newItemData = undefined;
    this.EventsFirst = undefined;
    window.scrollTo(0, 0);
    $('#FirstNews').hide();
    $('#articleNews').show();
    $('#Other-tiltle').show();
   }
  //display first acticrle 
  OnChangeActicrles(item){
    this.eventsURL = this._getDataService.getNewsURL();
    this._http.get(this.eventsURL).subscribe(data =>{
      this.eventsData = data;
      for(var i = 0; i < this.eventsData.length; i++){
      this.EventsFirst = this.eventsData[this.eventsData.length -1]; 
      this.CkeventsFirst = this.santized.bypassSecurityTrustHtml(this.EventsFirst.Content);  
      this.JapanCkeventsFirst = this.santized.bypassSecurityTrustHtml(this.EventsFirst.Japanese_Content);
      }  
      this.router.navigate(['/','tin-tuc-su-kien'], {relativeTo: this._route, queryParams: { name:item.Name,lang:this.lang == 'vi' ?'vi':'jp'}});    
    });
    this.newItemData = undefined;
    this.EventsFirst = undefined;
    $('#article').show();
    $('#new-article').show();
    $('#FirstNews').hide();
    $('#articleNews').hide();
    $('#Other-tiltle').show();
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
        if (this.homeImages[i].Name === "Tin tức và Sự kiện") {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
          }
        }
      }     
    });
    $('#Other-tiltle').hide();
  }

  back(){
    $('#new-article').hide();
    $('#FirstNews').show();
    $('#articleNews').hide();
    $('#Other-tiltle').hide();
    this.newItemData = undefined;
    this.EventsFirst = undefined;
    this.IsNewsData = this.NewsData.slice(1, this.NewsData.length);
    this.router.navigate(['tin-tuc-su-kien'], { queryParams: {lang: this.lang === 'jp' ? 'jp' : 'vi'} });
  }

  onmoveFn(data: NgxCarouselStore) { };

}