import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ] 
})
export class BannerComponent implements OnInit {

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
	      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
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
  
      this.imageURLs = this._getDataService.getAdvertURL();
      this.serverURL = this._getDataService.serverURL;
      this.data = this._getImageService.getAdvertFromServer();
      this.data.then(res => {
        this.homeImages = res;
        for (var i = 0; i < this.homeImages.length; i++) {
          this.homeImagesURL[i] = this.homeImages[i];
          //console.log(this.homeImagesURL[i]);
        }
      });
    }
    
    onClickInAdvertImage(item) {
      window.open(item.URL);
    };
    onmoveFn(data: NgxCarouselStore) { };
}