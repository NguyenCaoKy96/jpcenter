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
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class ChildrenComponent implements OnInit {

  public carouselBanner: NgxCarousel;

  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  public LANGUAGE: any = LANG_VI;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;
  courseURL;
  Contents;
  childContent;
  childDataItem;
  childrensURL: string;
  childrensData;
  japanSkillDataItem;
  japanContents;
  japanchildDataItem;
  japanchildContent;
  lang : string = 'vi' ;
  jlptUrl;
  jlptdata;
  jlptDataItem;
  japanjlptName;
  skillsURL;
  skillsData;
  skillDataItem
  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
  ) { 
 
     // Get jlpt data
     this.childrensURL = this._getDataService.getschildrenURL();
     this.http.get(this.childrensURL).subscribe(data => {
        this.childrensData = data;
        this.childDataItem = this.childrensData.Name;
        this.Contents = this.childrensData.contents;
        this.childContent = this.Contents.Content ;
        this.japanchildDataItem = this.childrensData.Japanese_Name;
        this.japanContents = this.childrensData.contents;
        this.japanchildContent = this.japanContents.Japanese_Content ;
     });
      //  Get jlpt data
    this.jlptUrl = this._getDataService.getjlptURL();
    this.http.get(this.jlptUrl).subscribe(data =>{
      this.jlptdata = data;
      this.jlptDataItem = this.jlptdata.Name;
      this.japanjlptName = this.jlptdata.Japanese_Name ;
    }); 
      // Get skill data
      this.skillsURL = this._getDataService.getSkillURL();
      this.http.get(this.skillsURL).subscribe(data => {
         this.skillsData = data;
         this.skillDataItem = this.skillsData.Name;
         this.japanSkillDataItem = this.skillsData.Japanese_Name;     
      });
  }

  ngOnInit() {
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang= 'vi';
        this.LANGUAGE = LANG_VI;
      } else {
        this.lang= 'jp';
        this.LANGUAGE = LANG_JP;
      }
    });
    // this._titleService.setTitle(this.LANGUAGE.CHILDREN_COURSE);

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
    //change language
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  } 
  onmoveFn(data: NgxCarouselStore) { };

}
