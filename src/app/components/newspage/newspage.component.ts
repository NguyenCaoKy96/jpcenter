import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

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
  p: number = 1;
  collection: any[] = [];  
	page = 'one';

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

  // Article variable
  newestArticle: any;
  newsURL: string;
  shortArticleContent: string;

  // Public newspage card\
  shortNewspageContent: string;
  newspageContent: any;
  newspageData;
  newspageURL: string;
  Newspage1;
  nameNewspage1;
  newspageImage1;
  japannameNewspage1;
  contenNewspage1;

  constructor(
    private titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  ) {
      //get data newspage for card
      this.newspageURL = this._getDataService.getNewsURL();
      this.http.get(this.newspageURL).subscribe(data =>{
      this.newspageData = data;
      this.Newspage1 = this.newspageData[1];
      this.nameNewspage1 = this.Newspage1.name;
      this.japannameNewspage1 = this.Newspage1.japanese_name;
      // this.contenNewspage1 = this.Newspage1.contents;
      this.newspageImage1 = 'http://10.1.0.66:1337' + this.Newspage1.image.url;


      });
   }

  ngOnInit() {
    // Pagin
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
    this.titleService.setTitle('Tin tức & sự kiện');

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Tin tức - Sự kiện") {
          for (var k = 0; k < this.homeImages[i].Images.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
          }
        }
      }
    });

    this.getNewestArticle();
  }

  afterCarouselViewedFn(data) { };

  onmoveFn(data: NgxCarouselStore) { };

  // Get newest article
  getNewestArticle() {
    var tempArticle: any;
    var tempNewestArticleIndex: number;
    var tempShortContent: string;
    var maxShortContentLength: number = 500;
    var isPublished: boolean = false;

    this.newsURL = this._getDataService.getNewsURL();
    this.http.get(this.newsURL).subscribe(data => {
      tempArticle = data;
      console.log(tempArticle[tempArticle.length - 2]);
      this.newestArticle = tempArticle[tempArticle.length - 1];
      for (var i = tempArticle.length - 1; i>=0; i--) {
        if(this.newestArticle.status === "Published") {
          isPublished = true;
          tempShortContent = this.newestArticle.contents;
          this.shortArticleContent = tempShortContent.substr(0, maxShortContentLength);
          this.shortArticleContent = this.shortArticleContent.substr(0, Math.min(this.shortArticleContent.length, this.shortArticleContent.lastIndexOf(" ")));
          break;
        } else {
          isPublished = false;
          this.newestArticle = tempArticle[tempArticle.length - i];
        }
      }
    });
  }

  
}