import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as $ from 'jquery';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';


@Component({
  selector: 'app-career-opportunities',
  templateUrl: './career-opportunities.component.html',
  styleUrls: ['./career-opportunities.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class CareerOpportunitiesComponent implements OnInit {

  public carouselConfig: NgxCarousel;
	
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  getjobsURL: string;
  jobs;
  jobsItem;

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
     // get data jobs
     this.getjobsURL = this._getDataService.getJobsURL();
     this.http.get(this.getjobsURL).subscribe(data => {
      this.jobs = data;
      //console.log('introduction', data[0].id);
      this.onChangeJobs(this.jobs[0].id);
    });
  }

  ngOnInit() {
  	this._titleService.setTitle('Cơ hội nghề nghiệp');

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

  afterCarouselViewedFn(data) { };

  onmoveFn(data: NgxCarouselStore) { };
  
  onChangeJobs(id, evt?) {
    let jobsItemURL = this._getDataService.getJobsItemURL(id);
    this.http.get(jobsItemURL).subscribe(data => {
      this.jobsItem = data;
    });
    $('.left-item').removeClass('active-link');
    if (evt) {
      $(evt.target).addClass('active-link');
    }
  }

}
