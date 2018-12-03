import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../services/get-data/get-data.service';
import { ScrollTopService } from './../../../services/scroll-top/scroll-top.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [ScrollTopService, GetDataService, GetImagesService]
})

export class EventComponent implements OnInit {
  serverURL: string;
  lang: string;
  introductionURL: string;
  introductionsData;
  introduction;
  public LANGUAGE: any = LANG_VI;

  // Event variable

  newQnuJapanURL: string;
  newQnuJapanData: any;
  newQnuName: any;
  newQnuJapanName: any;
  newQnuObject: any;
  newQnuJapanObject: any;
  newQnuContent: any;
  newQnuContentJapan: any;
  imageQnuJapan: any;
  linkQnuJapan: any;

  newDollURL: string;
  newDollData: any;
  newDollName: any;
  newDollJapanName: any;
  newDollObject: any;
  newDollJapanObject: any;
  newDollContent: any;
  newDollContentJapan: any;
  imageDollJapan: any;
  linkDollJapan: any;

  newAmbassURL: string;
  newAmbassData: any;
  newAmbassName: any;
  newAmbassJapanName: any;
  newAmbassObject: any;
  newAmbassJapanObject: any;
  newAmbassContent: any;
  newAmbassContentJapan: any;
  imageAmbassJapan: any;
  linkAmbassJapan: any;
  trimmedString: string;
  trimmedStringJapan: string;
  trimmedString2: string;
   trimmedStringJapan2: string;
  trimmedString3: string;
   trimmedStringJapan3: string;

  constructor(
    private _scrollTop: ScrollTopService,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute,
    private _getImageService: GetImagesService
  ) {
    this.serverURL = this._getDataService.serverURL;
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

      
 // Get new QNU Japan Center
      this.newQnuJapanURL = this._getDataService.getNewQnuJapanURL();
      this.http.get(this.newQnuJapanURL).subscribe(data => {
      this.newQnuJapanData = data;
      this.newQnuName = this.newQnuJapanData.Name;
      this.newQnuJapanName = this.newQnuJapanData.Japanese_Name;
      this.newQnuObject = this.newQnuJapanData.Object;
      this.newQnuJapanObject = this.newQnuJapanData.Japanese_Object;
      this.newQnuContent = this.newQnuJapanData.Content;
      this.newQnuContentJapan = this.newQnuJapanData.Japanese_Content;
      this.imageQnuJapan = this.serverURL + this.newQnuJapanData.Thumbnai.url;
      this.linkQnuJapan = this.newQnuJapanData.Slug;
      this.trimmedString = this.newQnuContent.substr(0, 400);
      this.trimmedStringJapan = this.newQnuContentJapan.substr(0, 200);
    });
 // Get new Doll Samurai
      this.newDollURL = this._getDataService.getNewDollURL();
      this.http.get(this.newDollURL).subscribe(data => {
      this.newDollData = data;
      this.newDollName = this.newDollData.Name;
      this.newDollJapanName = this.newDollData.Japanese_Name;
      this.newDollObject = this.newDollData.Object;
      this.newDollJapanObject = this.newDollData.Japanese_Object;
      this.newDollContent = this.newDollData.Content;
      this.newDollContentJapan = this.newDollData.Japanese_Content;
      this.imageDollJapan = this.serverURL + this.newDollData.Thumbnai.url;
      this.linkDollJapan = this.newDollData.Slug;
      this.trimmedString2 = this.newDollContent.substr(0, 400);
      this.trimmedStringJapan2 = this.newDollContentJapan.substr(0, 200);

    });
 
      // Get new The Ambassador of Japan
      this.newAmbassURL = this._getDataService.getNewAmbassURL();
      this.http.get(this.newAmbassURL).subscribe(data => { 
      this.newAmbassData = data;
      this.newAmbassName = this.newAmbassData.Name;
      this.newAmbassJapanName = this.newAmbassData.Japanese_Name;
      this.newAmbassObject = this.newAmbassData.Object;
      this.newAmbassJapanObject = this.newAmbassData.Japanese_Object;
      this.newAmbassContent = this.newAmbassData.Content;
      this.newAmbassContentJapan = this.newAmbassData.Japanese_Content;
      this.imageAmbassJapan = this.serverURL + this.newAmbassData.Thumbnai.url;
      this.linkAmbassJapan = this.newAmbassData.Slug;
      this.trimmedString3 =  this.newAmbassContent.substr(0, 400);
      this.trimmedStringJapan3 = this.newAmbassContentJapan.substr(0, 200);
    });
    
    this._scrollTop.setScrollTop();
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });

    
  }

  
}