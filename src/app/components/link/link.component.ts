import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

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

    // Carousel config
    index = 0;
    infinite = true;
    direction = 'left';
    directionToggle = true;
    autoplay = true;
  
    constructor(
      private http: HttpClient,
      private _getDataService: GetDataService,
      private _getImageService: GetImagesService
    ) { }
  
    ngOnInit() {
      this.carouselBanner = this._getImageService.carouselBanner;

      this.carouselBanner = {
	      grid: { xs: 2, sm: 3, md: 3, lg: 6, all: 0 },
	      slide: 1,
	      speed: 500,
	      interval: 3000,
	      point: {
					visible: true,
	        pointStyles: `
	          .ngxcarouselPoint li {
	            display: none;
            }
            .ngxcarousel > .ngxcarousel-inner > .ngxcarousel-items > .item {
              width: 50%;
            }
	        `
				},
	      load: 1,
	      loop: true,
				touch: true
	    };
  
      this.imageURLs = this._getDataService.getpartnerURL();
      this.serverURL = this._getDataService.serverURL;
      this.data = this._getImageService.getFromServer();
      this.data.then(res => {
        this.homeImages = res;
        for (var i = 0; i < this.homeImages.length; i++) {
          if (this.homeImages[i].name === "Đơn vị liên kết") {
            for (var k = 0; k < this.homeImages[i].Images.length; k++) {
              this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Images[k].url;
            }
          }
        }
      });
    }
  
    afterCarouselViewedFn(data) { };
  
    onmoveFn(data: NgxCarouselStore) { };
}
