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
import { default as LANG_VI } from '../../../../lang/lang_vi';

@Component({
  selector: 'app-newspage-other',
  templateUrl: './newspage-other.component.html',
  styleUrls: ['./newspage-other.component.css'],
   providers: [
    GetDataService,
    GetImagesService
  ]
})
export class NewspageOtherComponent implements OnInit {
  public LANGUAGE : any = LANG_VI;
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
  newspageURL;
  newspageData;
  newsData;
  newsAnotherData:any = [];

  constructor(
  	private titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  	) { 
  // getdata
         this.newspageURL = this._getDataService.getNewsURL();
         this.http.get(this.newspageURL).subscribe(data => {
           this.newsData = data;
           console.log('new', this.newsData);

         //handle another news
         for(let i = 0; i < this.newsData.length; i++){
            if(i == 0 || i == 5 || i == 6 || i == 7){
             this.newsAnotherData.push(this.newsData[i]);
             }
          }
    });}

  ngOnInit() {
  	  // Pagin
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
    this.titleService.setTitle('Tin tức & sự kiện');

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
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
  }

  onmoveFn(data: NgxCarouselStore) { };
}
