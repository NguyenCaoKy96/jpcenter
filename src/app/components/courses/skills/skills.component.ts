import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class SkillsComponent implements OnInit {

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
  courseURL;
  course;
  courseData;
  courseDataItem;
  skillsURL: string;
  skillsData;

  constructor(
    private titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  ) { 
     //Get courses data
     this.courseURL = this._getDataService.getHeaderURL();
     this.http.get(this.courseURL).subscribe(data => {
       this.course = data;
         for(var i = 0; i < this.course.length; i++){
           if(this.course[i].Name === "Khóa học"){
             this.courseData = this.course[i].Name;
             this.courseDataItem = this.course[i].categories;    
         }
        }
     });  
     // Get jlpt data
     this.skillsURL = this._getDataService.getskillsURL();
     this.http.get(this.skillsURL).subscribe(data => {
       this.skillsData = data;
     });
  }

  ngOnInit() {
    this.titleService.setTitle('Khóa học');

    this.carouselBanner = this._getImageService.carouselBanner;

    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].name === "Khóa học") {
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
