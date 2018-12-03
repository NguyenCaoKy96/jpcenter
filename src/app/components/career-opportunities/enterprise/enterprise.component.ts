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
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class EnterpriseComponent implements OnInit {

  public LANGUAGE : any = LANG_VI;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  enterpriseURL: string;
  enterpriseData: any;
  enterpriseName: any;
  enterpriseJapanName: any;
  Contents: any;
  enterpriseContent: any;
  enterpriseJapanContent: any;
  serverURL: any;
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
     // get data enterprise
     this.enterpriseURL = this._getDataService.getEnterpriseURL();
     this.http.get(this.enterpriseURL).subscribe(data => {
        this.enterpriseData = data;
        this.Contents = this.enterpriseData.contents;
        this.enterpriseName = this.Contents.Name;
        //console.log(this.enterpriseName);
        this.enterpriseJapanName = this.Contents.Japanese_Name; 
        //console.log(this.enterpriseJapanName); 
        this.enterpriseContent = this.Contents.Content;
        //console.log(this.enterpriseContent);
        this.enterpriseJapanContent = this.Contents.Japanese_Content;
        //console.log(this.enterpriseJapanContent);
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
