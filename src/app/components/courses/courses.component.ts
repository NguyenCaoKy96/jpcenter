import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class CoursesComponent implements OnInit {
	public carouselBanner: NgxCarousel;

  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  lang: string = 'vi';

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
  jlptURL: string;
  jlptData;
  jlptItemData;

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private router:Router, 
    private route: ActivatedRoute
  ) { 
        //change language
        this.route.queryParams.subscribe(data => {
          this.lang = data.lang;
          console.log(this.lang)
        });
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
    this.jlptURL = this._getDataService.getjlptURL();
    this.http.get(this.jlptURL).subscribe(data => {
      this.jlptData = data;
        
    });
  } 
  onchangeCourse(id, evt?){
    let jlptItemDataURL = this._getDataService.getjlptItemURL(id);
    this.http.get(jlptItemDataURL).subscribe(data => {
      this.jlptItemData = data;
      console.log(this.jlptItemData);  
    });
    $('left-item').removeClass('active-link');
    if (evt) {
      $(evt.target).addClass('active-link');
    };
    $('#left-item').hide();
  }
  ngOnInit() {
  	this._titleService.setTitle('Khóa học');

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