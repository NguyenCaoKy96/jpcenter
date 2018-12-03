import { Component, OnInit } from '@angular/core';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class SlideComponent implements OnInit {

  public carouselBanner: NgxCarousel;

  imageURLs: any;
  sliderImages: any[] = [];
  sliderImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;

  constructor(
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  ) { }

  ngOnInit() {
    
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.sliderImages = res;
      for (var i = 0; i < this.sliderImages.length; i++) {
        if (this.sliderImages[i].Name === "Trang chủ") {
          for (var k = 0; k < this.sliderImages[i].Image.length; k++) {
            this.sliderImagesURL[k] = this.serverURL + this.sliderImages[i].Image[k].url;
          }
        }
      }
    });
  }

  onmoveFn(evt) { };
}