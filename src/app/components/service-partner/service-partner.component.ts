import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

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
  public LANGUAGE : any = LANG_VI;
	serviceType = 'one';
	public page='one';
  public content=[{"ggg":"<figure class=\"image\"><img src=\"https://36013.cdn.cke-cs.com/cuwJ4DhybS2TdOeOxsmr/images/33df3b394f5ee7be98319ed45e440fe735a92e244a2bf5d9_download.jpg\" srcset=\"https://36013.cdn.cke-cs.com/cuwJ4DhybS2TdOeOxsmr/images/33df3b394f5ee7be98319ed45e440fe735a92e244a2bf5d9_download.jpg/w_125 125w, https://36013.cdn.cke-cs.com/cuwJ4DhybS2TdOeOxsmr/images/33df3b394f5ee7be98319ed45e440fe735a92e244a2bf5d9_download.jpg/w_205 205w, https://36013.cdn.cke-cs.com/cuwJ4DhybS2TdOeOxsmr/images/33df3b394f5ee7be98319ed45e440fe735a92e244a2bf5d9_download.jpg/w_285 285w\" sizes=\"100vw\" width=\"285\"></figure><p>&nbsp;</p><p>LỆ Yêu CU Anh quá trời ơi&nbsp;</p><p><strong>LỆ yêu cu anh quá trời ơi</strong></p><ul><li>Lệ yêu cu anh quá trời ơi&nbsp;</li></ul>","_id":"5bfcf5290874480c983a0f70","createdAt":"2018-11-27T07:41:29.266Z","updatedAt":"2018-11-27T08:35:55.727Z","__v":0,"id":"5bfcf5290874480c983a0f70"}];

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
  	private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) { 
    // get data services
    this.getServicesURL = this._getDataService.getServicesURL();
    this._http.get(this.getServicesURL).subscribe(data => {
     this.services = data;
     console.log(this.services)
     this.onChangeServices(this.services[0].id);
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

    this._titleService.setTitle(this.LANGUAGE.SERVICE_AND_PARTNER);
    
    	// Slide images
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
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

  onmoveFn(data: NgxCarouselStore) { };

  onChangeServices(id, evt?){
    let servicesItemURL = this._getDataService.getServicesItemURL(id);
    this._http.get(servicesItemURL).subscribe(data => {
      this.servicesItem = data;
    });
    $('.left-item').removeClass('active-link');
    if (evt) {
      $(evt.target).addClass('active-link');
    }
  }
}