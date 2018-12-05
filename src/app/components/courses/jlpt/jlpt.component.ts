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
import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jlpt',
  templateUrl: './jlpt.component.html',
  styleUrls: ['./jlpt.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class JlptComponent implements OnInit {

  public carouselBanner: NgxCarousel;

  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  lang: string;
  public LANGUAGE: any = LANG_VI;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;
  jlptURL;
  jlptData;
  courseURL;
  course;
  courseData;
  courseDataItem;
  jlptItemData;
  trimmedString;
  japantrimmedString;
  EDUCATION_PROGRAM = 'Chương trình đào tạo';

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
  ) {     
      // Get jlpt data
      this.jlptURL = this._getDataService.getCourseURL();
      this.http.get(this.jlptURL).subscribe(data => {
        this.jlptData = data;
        for(var i = 0; i < this.jlptData.length; i++){
          this.trimmedString = this.jlptData[i].Skill.substr(0, 200);
          this.japantrimmedString = this.jlptData[i].JapaneseSkill.substr(0, 200);
        } 
      });
    }

  ngOnInit() {
     // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang ='vi';
        this.LANGUAGE = LANG_VI;
      } else {
        this.lang='jp';
        this.LANGUAGE = LANG_JP;
      }
    }); 
    this._titleService.setTitle(this.LANGUAGE.JLPT_COURSE);
    //console.log(this.LANGUAGE.EDUCATION_PROGRAM);

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === "Khóa học") {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
          }
        }
      }
    });
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }

  onmoveFn(data: NgxCarouselStore) { };
  
  // onchangeCourse(id){
  //   let jlptItemDataURL = this._getDataService.getCourseItemURL(id);
  //   this.http.get(jlptItemDataURL).subscribe(data => {
  //     this.jlptItemData = data;
  //     console.log(this.jlptItemData);  
  //   });
  //   $('#left-item').hide();
  //  }
}
