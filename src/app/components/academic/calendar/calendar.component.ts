import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';
import { ActivatedRoute } from '@angular/router';

// Language
import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class CalendarComponent implements OnInit {

  public LANGUAGE : any = LANG_VI;
  openingSchedule: any;
  openingURL: string;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  link;
  txtArea1;
  rows: any;
  newQnuJapanURL: string;
  newQnuJapanData:any;
  imageQnuJapan: { [key: number]: string } = [];



  constructor(
    private titleService: Title,
    private _titleService: Title,
    private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
    // post data upload file
    //  $(function ($) {
    //   var validation_holder;
    //   $("form#uploadForm button[name='submit']").click(function () {
    //     var validation_holder = 0;
    //     var fileup = $('#file').val();
    //      var name = $('#name').val();
        
    //     if (validation_holder == 1) {
          
    //       return;
    //     } else {
    //       $.post('http://10.1.0.66:1336/sliders', {
    //         Image: fileup,
    //         Name: name,
    //       }, function (data) {
    //         console.log(Image);
    //         alert("Bạn đã đăng ký thành công..!.");
    //         window.location.reload();
    //       });
    //     }
    //   });
    // });
      //get data images
        this.newQnuJapanURL = this._getDataService.getEventsURL();
        this._http.get(this.newQnuJapanURL).subscribe(data =>{
          this.newQnuJapanData = data;
          for (var i = 0; i < this.newQnuJapanData.length; ++i) {
             this.imageQnuJapan ='http://10.1.0.66:1336' + this.newQnuJapanData[i].Thumbnai.url;
            console.log(this.imageQnuJapan);
            
              }
        });

    //get data download
    this.openingURL = this._getDataService.getOpeningScheduleURL();
    this._http.get(this.openingURL).subscribe(data => {
      this.openingSchedule = data;
      console.log(this.openingSchedule);
      for (var i = 0; i < this.openingSchedule.length; i++) {
        this.link = this.openingSchedule[0].Link;
        console.log(this.link)
      }

    });
    // Title 
    this._titleService.setTitle('Điểm thi');

//get data openings
  	this.openingURL = this._getDataService.getCoursesURL();
  	this._http.get(this.openingURL).subscribe(data =>{
  		this.openingSchedule = data;
  	});
    // Change language
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === "Học vụ") {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
          }
        }
      }
    })
  }
}
