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

  newHeaderData: any;
  imageHeaderData: string;
  newsPageItems:any = [];

  constructor(
    private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) {
      //get data newspage for card
      this.newsPageURL = this._getDataService.getNewsURL();
      this._http.get(this.newsPageURL).subscribe(data =>{
        this.newsPageData = data;
        console.log('newpage',this.newsPageData[1].Content);

        this.newHeaderData = this.newsPageData[0];
        this.imageHeaderData = this.serverURL + this.newHeaderData.Thumbnai.url;
        console.log('newHeaderData',this.newHeaderData);

        for(let i = 0; i < this.newsPageData.length; i++){
          if(i > 0){
           this.newsPageItems.push(this.newsPageData[i]);

           //cut content to short content (from 0 to 130)
           // this.newsPageItems[i-1].Object = this.newsPageData[i].Content.replace(/^(.{130}[^\s]*).*/, "$1");
          }
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

    this.getNewestArticle();
  }

  onmoveFn(data: NgxCarouselStore) { };

  // Get newest article
  getNewestArticle() {
    var tempArticle: any;
    var tempNewestArticleIndex: number;
    var longContent: string;
    var maxShortContentLength: number = 200;
    var isPublished: boolean = false;

    this.newsURL = this._getDataService.getNewsURL();
    this._http.get(this.newsURL).subscribe(data => {
      tempArticle = data;
      this.newestArticle = tempArticle[tempArticle.length - 1];
      for (var i = tempArticle.length - 1; i>=0; i--) {
        if(this.newestArticle.Status === "Published") {
          isPublished = true;
          longContent = this.newestArticle.Content;
          this.shortArticleContent = longContent.substr(0, maxShortContentLength);
          this.shortArticleContent = this.shortArticleContent.substr(0, Math.min(this.shortArticleContent.length, this.shortArticleContent.lastIndexOf(" ")));
          this.figure = $(longContent).find('img:first').prevObject[1];
          var a = $(this.figure).clone();
          $('figure', a).remove();
          $('.thumnail').append(a.html());
          break;
        } else {
          isPublished = false;
          this.newestArticle = tempArticle[tempArticle.length - i];
        }
      }
    });
  } 
}