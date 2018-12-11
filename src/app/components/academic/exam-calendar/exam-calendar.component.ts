import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';
import { ActivatedRoute } from '@angular/router';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

// Language
import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';

@Component({
  selector: 'app-exam-calendar',
  templateUrl: './exam-calendar.component.html',
  styleUrls: ['./exam-calendar.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class ExamCalendarComponent implements OnInit {

  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  public LANGUAGE : any = LANG_VI;
  academicsURL: string;
  academics:any;
  newQnuJapanURL: string;
  newQnuJapanData: any;
  imageQnuJapan: any[] = [];
  sliderImagesURL: any[] = [];
  public isVietnamese: boolean = true;
  lang: string;

  constructor(private titleService: Title,
  	private _titleService: Title,
  	private _http: HttpClient,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute 
    ) { }

  ngOnInit() {
  
     // Change language
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang ='vi';
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.lang = 'jp';
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
    });
     
      // get data academics
  		this.academicsURL = this._getDataService.getAcademicsURL();
  	    this._http.get(this.academicsURL).subscribe(data =>{
  		this.academics = data;
  	  });
   
         //get data images
        this.newQnuJapanURL = this._getDataService.getAcademicsURL();
        this._http.get(this.newQnuJapanURL).subscribe(data =>{
          this.newQnuJapanData = data;
          for (var i = 0; i < this.newQnuJapanData[0].File_Upload.length; i++) {
               this.sliderImagesURL.push('http://10.1.0.66:1336' + this.newQnuJapanData[0].File_Upload[i].url) ;
            console.log(this.sliderImagesURL); 
              }
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
    });

//     var tableToExcel = (function() {
//   var uri = 'data:application/vnd.ms-excel;base64,'
//     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//     , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
//     , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
//   return function(table, name) {
//     if (!table.nodeType) table = document.getElementById(table)
//     var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
//     window.location.href = uri + base64(format(template, ctx))
//   }
// })()
   
  }
  
}
