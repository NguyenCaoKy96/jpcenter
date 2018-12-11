import { Component, OnInit, Input,  ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

// Title
import { Title, DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

//import { $ } from 'protractor';
import * as $ from 'jquery';
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from './../../../lang/lang_jp';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ],
  encapsulation: ViewEncapsulation.None
})

export class IntroductionComponent implements OnInit {

  sliderImages: any[] = [];
  sliderImagesURL: { [key: number]: string } = [];
  public LANGUAGE : any = LANG_VI;
  public isVietnamese: boolean = true;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  public introData: SafeHtml;
  index = 0;
  infinite = true;
  categoriesData:any;
  introductionItemData;
  introductionURL: string;
  introduction: any=[];
  lang: string ;
  menuLeftData:any=[];
  introductionsDataActive:any;
  introductionContent:SafeHtml;
  personnelData:any;
  personDetail:any;
  results=[];
  id:string;
  EventsFirst: any;
  introductionContentJP:SafeHtml;

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _router:Router, 
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private santized: DomSanitizer
  ) 
            // change language
  {    
    this.route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }

      // check url with header
    if (data.id !== undefined) {
      let categoriesURL = this._getDataService.getCategoriesURL();
      this.http.get(categoriesURL).subscribe(dataObj => {
      this.categoriesData = dataObj;
      let arrTemp = [];
      for(var i=0; i<this.categoriesData.length; i++) {
        if(this.categoriesData[i].Parent && (this.categoriesData[i].Parent.Name === this.LANGUAGE.INTRODUCTION_PAGE  || this.categoriesData[i].Parent.Japanese_Name === this.LANGUAGE.INTRODUCTION_PAGE )) { 
          arrTemp.push(this.categoriesData[i]);
        }
      }
      if (arrTemp[data.id] !== undefined){
        this.introductionsDataActive = arrTemp[data.id];
      }
    });
    }
    });

    // Title
     this._titleService.setTitle(this.LANGUAGE.INTRODUCTION_PAGE);

    // get data introduction
let categoriesURL = this._getDataService.getCategoriesURL();    this.http.get(categoriesURL).subscribe(data => {
      this.categoriesData = data;

      for(var i=0; i<this.categoriesData.length; i++) {
        if(this.categoriesData[i].Parent && (this.categoriesData[i].Parent.Name === this.LANGUAGE.INTRODUCTION_PAGE  || this.categoriesData[i].Parent.Japanese_Name === this.LANGUAGE.INTRODUCTION_PAGE )) {
          if(this.introductionsDataActive == undefined){
            this.introductionsDataActive = this.categoriesData[i];   
             }
          this.menuLeftData.push(this.categoriesData[i]);
        }
      }
      this.introductionContent = this.santized.bypassSecurityTrustHtml(this.introductionsDataActive.contents.Content)
      this.introductionContentJP = this.santized.bypassSecurityTrustHtml(this.introductionsDataActive.contents.Japanese_Content)
      this.route.params.subscribe(params => {
        this.id = params['id'];
         for(var i=0; i<this.categoriesData.length; i++) {
           if (this.id != undefined) {
                  const slug = "/gioi-thieu/" + this.id;
                  if(this.categoriesData[i].Slug === slug) {
                    this.onChangeIntroduction(this.categoriesData[i]);
              }
            }
         }
      });
    });
  }  

  ngOnInit() {
    // change language
    this.route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
    });
    // Get language
    this.route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
    //Get Images data
    this.carouselBanner = this._getImageService.carouselBanner;

     this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.sliderImages = res;
      for (var i = 0; i < this.sliderImages.length; i++) {
        if (this.sliderImages[i].Name === "Giới thiệu") {
          for (var k = 0; k < this.sliderImages[i].Image.length; k++) {
            this.sliderImagesURL[k] = this.serverURL + this.sliderImages[i].Image[k].url;
          }
        }
      }
    });
  }

  onChangeIntroduction(item) {
    this.introductionsDataActive = item;
     if(this.introductionsDataActive.Slug == '/gioi-thieu/nhan-su-trung-tam'){
       let personnelURL = this._getDataService.getpersonnelURL();
       this.http.get(personnelURL).subscribe(data=>{
         this.personnelData = data;
        // console.log('personal',this.personnelData);
       })
     }
     this.introductionContent = this.santized.bypassSecurityTrustHtml(this.introductionsDataActive.contents.Content)
     this.introductionContentJP = this.santized.bypassSecurityTrustHtml(this.introductionsDataActive.contents.Japanese_Content)


  }

  onChangePerson(person, content){
    this.personDetail = person;
    this.personDetail.imageUrl = this.serverURL + person.Image.url;
   
    //open popup here
    $("#btnModal").click();
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true, windowClass : "personModal" });
  }

  onmoveFn(data: NgxCarouselStore) { };

  back(){
    this.introductionsDataActive = undefined;
    this._router.navigate(['gioi-thieu'], { queryParams: {lang: this.lang === 'jp' ? 'jp' : 'vi'} });
  }
}
