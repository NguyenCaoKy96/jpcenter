import { Injectable } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";

// Service
import { GetDataService } from './../get-data/get-data.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  public carouselBanner: NgxCarousel;

	imageURLs: any;
	partnerURLs: any;
	advertURLs: any;
  public homeImagesURL: { [key: number]: string } = [];
	serverURL: any;

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
  ) {
		 this.imageURLs = this._getDataService.getImagesURL();
		 this.partnerURLs = this._getDataService.getPartnerURL();
		 this.advertURLs = this._getDataService.getAdvertURL();
	    this.serverURL = this._getDataService.serverURL;
	    this.carouselBanner = {
	      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
	      slide: 1,
	      speed: 500,
	      interval: 3000,
	      point: {
					visible: true,
					hideOnSingleSlide: true,
	        pointStyles: `
	          .ngxcarouselPoint {
	            // list-style-type: none;
	            // text-align: center;
	            white-space: nowrap;
	            // overflow: auto;
	            position: absolute;
	            bottom: -10px;
							right: 40%;
	            width: auto;
	            // box-sizing: border-box;
	            z-index: 999;
						}

	           @media only screen and (max-width: 768px) {
	                .ngxcarouselPoint {
	                  overflow: none;
										scroll: none;
										left: 140px;
        						bottom: -33px;
										z-index: 2;
									}
	            }

	          .ngxcarouselPoint li {
	            display: inline-block;
	            border-radius: 999px;
	            background: none;
	            padding: 6px;
	            margin: 8px;
	            transition: .4s ease all;
	            border: 1px solid white;
	          }
	          .ngxcarouselPoint li.active {
	              background: white;
	              width: 10px;
						}
	        `
				},
	      load: 1,
	      loop: true,
				touch: true
	    };
	}
  
  // Get data from Images API
  async getImageFromServer() {
      let data = await this.http.get(this.imageURLs).toPromise();
      return data;
	}
	
	// Get data from Partner API
  async getPartnerFromServer() {
		let data = await this.http.get(this.partnerURLs).toPromise();
		return data;
	}

	// Get data from Advert API
	async getAdvertFromServer() {
		let data = await this.http.get(this.advertURLs).toPromise();
		return data;
	}
}
