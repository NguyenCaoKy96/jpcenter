
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
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
import { ActivatedRoute, Router } from '@angular/router';

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
  lang : string = 'vi' ;
  public LANGUAGE: any = LANG_VI;

  // Ck css
  CkjlptItemData:SafeHtml;
  JPCkjlptItemData:SafeHtml;

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
  jlptDataItem;
  jlptContent;
  japanjpltName;
  jlptUrl;
  jlptdata;
  skillsURL;
  skillsData;
  skillDataItem;
  japanSkillDataItem;
  japanchildDataItem;
  childDataItem;
  childrensURL;
  childrensData;
  EDUCATION_PROGRAM = 'Chương trình đào tạo';

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
    private santized: DomSanitizer,
    private router : Router,
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
     // get title jlpt
      this.jlptUrl = this._getDataService.getjlptURL();
      this.http.get(this.jlptUrl).subscribe(data =>{
        this.jlptdata = data;
        this.jlptDataItem = this.jlptdata.Name;
        this.japanjpltName = this.jlptdata.Japanese_Name ;
      });
       // Get skill data
       this.skillsURL = this._getDataService.getSkillURL();
       this.http.get(this.skillsURL).subscribe(data => {
          this.skillsData = data;
          this.skillDataItem = this.skillsData.Name;
          this.japanSkillDataItem = this.skillsData.Japanese_Name;     
       });
         // Get children data
     this.childrensURL = this._getDataService.getschildrenURL();
     this.http.get(this.childrensURL).subscribe(data => {
        this.childrensData = data;
        this.childDataItem = this.childrensData.Name;
        this.japanchildDataItem = this.childrensData.Japanese_Name;
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
    this._titleService.setTitle(this.LANGUAGE.COURSE);
    // get Image course
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
    // change language
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }
  onmoveFn(data: NgxCarouselStore) { };
  onchangeCourse(item){
    let jlptItemDataURL = this._getDataService.getCourseItemURL(item._id);
    this.http.get(jlptItemDataURL).subscribe(data => {
      this.jlptItemData = data;   
      this.CkjlptItemData = this.santized.bypassSecurityTrustHtml(this.jlptItemData.Fee);
      this.JPCkjlptItemData = this.santized.bypassSecurityTrustHtml(this.jlptItemData.JapaneseFee); 
      this.router.navigate(['/khoa-hoc','cac-khoa-tieng-nhat-JLPT'], {relativeTo: this._route, queryParams: { name:item.Name,lang:this.lang == 'vi' ?'vi':'jp'}});
      $('#left-item').hide();
    }); 
    
   }
   back(){
    this.jlptItemData = undefined;
    $('#left-item').show();
    this.router.navigate(['/khoa-hoc','cac-khoa-tieng-nhat-JLPT'], { queryParams: {lang: this.lang === 'jp' ? 'jp' : 'vi'} });
   }
}
