import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';

// Language
import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';

@Component({
  selector: 'app-japan-center',
  templateUrl: './japan-center.component.html',
  styleUrls: ['./japan-center.component.css'], 
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class JapanCenterComponent implements OnInit {

  public LANGUAGE : any = LANG_VI;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  japanURL: string;
  japanData: any;
  japanName: any;
  japanJapanName: any;
  Contents: any;
  serverURL: any;
  japanContent: any;
  jaJapanContent: any;
  data: any;
  lang : string = 'vi';

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
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) {
    // get data Japan-Center
    this.japanURL = this._getDataService.getJapanOpportunityURL();
    this.http.get(this.japanURL).subscribe(data => {
       this.japanData = data;
       this.japanName = this.japanData.Name;
       this.japanJapanName = this.japanData.JapaneseName;
       this.Contents = this.japanData.contents; 
       this.japanContent = this.Contents.Content;
       this.jaJapanContent = this.Contents.Japanese_Content;   
    });
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

    this._titleService.setTitle(this.LANGUAGE.CAREER_OPPOTUNITY);

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === "Cơ hội nghề nghiệp") {
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

}
