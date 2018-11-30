import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class LinkComponent implements OnInit {
  public carouselBanner: NgxCarousel;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  image: any;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;
  partner: any;
  public LANGUAGE: any = LANG_VI;

  constructor(
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: Router,
    private _activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activedRoute.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });

    this.carouselBanner = this._getImageService.carouselBanner;
    this.carouselBanner = {
      grid: { xs: 2, sm: 3, md: 3, lg: 5, all: 0 },
      slide: 1,
      speed: 500,
      interval: 3000,
      point: {
        visible: true,
        pointStyles: `
	        .ngxcarouselPoint li {
	          display: none;
          }
	      `
      },
      load: 1,
      loop: true,
      touch: true
    };

    this.imageURLs = this._getDataService.getPartnerURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getPartnerFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        this.homeImagesURL[i] = this.homeImages[i];
        //console.log(this.homeImagesURL[i]);
      }
    });
  }

  /**
  * Navigate to Partner Home page when click on logo
  * @ Param item Logo of partner
  */
  onClickInPartnerLogo(item) {
    window.open(item.URL);
  };

  onmoveFn(data: NgxCarouselStore) { };
}