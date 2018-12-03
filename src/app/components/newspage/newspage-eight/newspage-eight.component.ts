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
  selector: 'app-newspage-eight',
  templateUrl: './newspage-eight.component.html',
  styleUrls: ['./newspage-eight.component.css'],
   providers: [
    GetDataService,
    GetImagesService
  ]
})
export class NewspageEightComponent implements OnInit {
  LANGUAGE: any = LANG_VI;
  newspageURL;
  newspageData;
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

  constructor(
  	private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  	) {
         this.newspageURL = this._getDataService.getNewsURL();
         this.http.get(this.newspageURL).subscribe(data => {
         this.newspageData = data;
         this.newspageData = this.newspageData[7];
    }); }

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
  }

  onmoveFn(data: NgxCarouselStore) { };
}
