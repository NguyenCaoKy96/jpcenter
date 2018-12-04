import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../../services/get-data/get-data.service';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { default as LANG_VI } from '../../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../../lang/lang_jp';
import { ActivatedRoute } from '@angular/router';
import { GetImagesService } from './../../../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

@Component({
  selector: 'app-introduction-four',
  templateUrl: './introduction-four.component.html',
  styleUrls: ['./introduction-four.component.css'],
  providers: [GetDataService, NgbModalConfig, NgbModal],
})
export class IntroductionFourComponent implements OnInit {

  public carouselBanner: NgxCarousel;
  imageURLs: any;
  sliderImages: any[] = [];
  sliderImagesURL: { [key: number]: string } = [];
  data: any;
	 public introductionsData;
         introductionURL:string;
         introductionsData3;
         PersonnelURL;
         PersonnelData;
         personDetail;
         serverURL: any;
   public LANGUAGE: any = LANG_VI;

  constructor( 
    private http: HttpClient,
    private _titleService: Title,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
  ) 

  { 
    config.backdrop = 'static';
    config.keyboard = false;

      this.serverURL = this._getDataService.serverURL;
  	// get data introduction
     this.introductionURL = this._getDataService.getIntroducesURL();
     this.http.get(this.introductionURL).subscribe(data => {
     this.introductionsData = data;
     this.introductionsData = this.introductionsData[3];
     console.log("4", this.introductionsData);
    });
     this.PersonnelURL=this._getDataService.getpersonnelURL();
     this.http.get(this.PersonnelURL).subscribe(data=>{
     this.PersonnelData=data;
     console.log('personal',this.PersonnelData);

     })
  }

  ngOnInit() {
    
    
     // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });
    
    this._titleService.setTitle(this.LANGUAGE.INTRODUCTION_PAGE);
    //console.log(this.LANGUAGE.EDUCATION_PROGRAM);

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

  onChangePerson(person, content){
    this.personDetail = person;
    this.personDetail.imageUrl = this.serverURL + person.Image.url;
    //open popup here
    $("#btnModal").click();
    console.log('person', this.personDetail);
   
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true, windowClass : "personModal" });
  }


}
