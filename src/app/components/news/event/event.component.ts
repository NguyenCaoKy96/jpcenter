import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../services/get-data/get-data.service';
import { ScrollTopService } from './../../../services/scroll-top/scroll-top.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';
import { ActivatedRoute } from '@angular/router';

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
  eventsArticle: any;
  shortArticleContent: string;

  eventData;
  eventURL: string;
  Event1;
  Event2;
  Event3;
  nameEvent1;
  nameEvent2;
  nameEvent3;
  eventImage1;
  eventImage2;
  eventImage3;
  japannameEvent1;
  japannameEvent2;
  japannameEvent3;
  contenEvent1;
  contenEvent2;
  contenEvent3;

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

      
    // Get Events from Events API
      this.eventURL = this._getDataService.getNewsURL();
      this.http.get(this.eventURL).subscribe(data => {
      this.eventData = data;
      this.Event1 = this.eventData[1];
      this.nameEvent1 = this.Event1.Name;
      console.log(this.nameEvent1);

      this.japannameEvent1 = this.Event1.japanese_Name;
      this.contenEvent1 = this.Event1.Content;
      this.eventImage1 = this.serverURL + this.Event1.Image.url;
      console.log(this.nameEvent1);

      this.Event2 = this.eventData[2];
      this.nameEvent2 = this.Event2.Name;
      this.japannameEvent2 = this.Event2.japanese_Name;
      // this.contenEvent1 = this.Event1.contents;
      this.eventImage2 = this.serverURL + this.Event2.Image.url;

      this.Event3 = this.eventData[3];
      this.nameEvent3 = this.Event3.Name;
      this.japannameEvent3 = this.Event3.japanese_Name;
      // this.contenEvent1 = this.Event1.contents;
      this.eventImage3 = this.serverURL + this.Event3.Image.url;
    });
    
    this._scrollTop.setScrollTop();
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });


  }

  // Get short content of events
  getEventShort() {
    var tempNewestArticleIndex: number;
    var eventData: any;
    var tempShortContent: string;
    var maxShortContentLength: number = 50;
    var isPublished: boolean = false;
    this.eventURL = this._getDataService.getNewsURL();
    this.http.get(this.eventURL).subscribe(data => {
      this.eventData = data;
      console.log(eventData[eventData.length - 2]);
      this.eventsArticle = eventData[eventData.length - 1];
      for (var i = eventData.length - 1; i >= 0; i--) {
        if (this.eventsArticle.status === "Published") {
          isPublished = true;
          tempShortContent = this.eventsArticle.contents;
          this.contenEvent1 = tempShortContent.substr(0, maxShortContentLength);
          this.contenEvent1 = this.contenEvent1.substr(0, Math.min(this.contenEvent1.length, this.contenEvent1.lastIndexOf(" ")));
          break;
        } else {
          isPublished = false;
          this.eventsArticle = eventData[eventData.length - i];
        }
      }
    });
  }
}