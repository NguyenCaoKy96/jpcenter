import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Component({
  selector: 'app-service-partner',
  templateUrl: './service-partner.component.html',
  styleUrls: ['./service-partner.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class ServicePartnerComponent implements OnInit {
	serviceType = 'one';
	public page='one';

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
  getServicesURL : string;
  services;
  servicesItem;
  servicesItemURL: string;

  constructor(
  	private titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  ) { 
    // get data services
    this.getServicesURL = this._getDataService.getServicesURL();
    this.http.get(this.getServicesURL).subscribe(data => {
     this.services = data;
     console.log(this.services)
     this.onChangeServices(this.services[0].id);
   });
  }

  ngOnInit() {
  	this.titleService.setTitle('Dịch vụ & Đối tác');

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Dịch vụ - Đối tác") {
          for (var k = 0; k < this.homeImages[i].Images.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
          }
        }
      }
    });
  }

  afterCarouselViewedFn(data) { };

  onmoveFn(data: NgxCarouselStore) { };

  onChangeServices(id, evt?){
    let servicesItemURL = this._getDataService.getServicesItemURL(id);
    this.http.get(servicesItemURL).subscribe(data => {
      this.servicesItem = data;
    });
    $('.left-item').removeClass('active-link');
    if (evt) {
      $(evt.target).addClass('active-link');
    }
  }
  
}
