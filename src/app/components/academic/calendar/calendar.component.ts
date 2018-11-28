import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

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
	openingSchedule: any;
	openingURL: string;

	carouselBanner: any;
    imageURLs: any;
    homeImages: any[] = [];
    homeImagesURL: { [key: number]: string } = [];
    serverURL: any;
    data: any;

    academicsURL: string;
    academics:any;

  constructor(private titleService: Title,
  	private _titleService: Title,
  	private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService) { }

  ngOnInit() {
  	// Title 
  	this._titleService.setTitle('Điểm thi');

  	//get data openings
  	this.openingURL = this._getDataService.getOpeningScheduleURL();
  	this._http.get(this.openingURL).subscribe(data =>{
  		this.openingSchedule = data;
  	});

  	// Slide images
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Cơ hội nghề nghiệp") {
          for (var k = 0; k < this.homeImages[i].Images.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
          }
        } 
      }
    });
  }

}
