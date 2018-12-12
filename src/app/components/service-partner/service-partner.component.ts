import { Component, OnInit } from '@angular/core';
import { Title, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-service-partner',
  templateUrl: './service-partner.component.html',
  styleUrls: ['./service-partner.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class ServicePartnerComponent implements OnInit {

  public carouselConfig: NgxCarousel;
  public LANGUAGE: any = LANG_VI;
  public isVietnamese: boolean = true;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  serviceDataActive: any;
  lang: string;
  serviceContent: SafeHtml;
  serviceJpContent: SafeHtml;
  serviceItemData: any;

  // Carousel config
  index = 0;
  infinite = true;
  direction = 'left';
  directionToggle = true;
  autoplay = true;

  // Side navigation item
  apiCategories: string;
  item: any;
  itemData: any = [];
  itemContents: any = {
    vietnameseName: '',
    japaneseName: '',
    vietnameseContents: '',
    japaneseContents: ''
  };
  slug: any = {
    vietnameseSlug: '',
    japaneseSlug: ''
  };

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _route: ActivatedRoute,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private santized: DomSanitizer,
    private router : Router,
  ) { }

  ngOnInit() {

    let hasData = false;
    this.apiCategories = this._getDataService.getCategoriesURL();
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang = 'vi';
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.lang = 'jp';
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
      if (data.id !== undefined) {
        this.selectItem(data.id);
        hasData = true;
      }
    });

    this._titleService.setTitle(this.LANGUAGE.SERVICE_AND_PARTNER);

    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === "Dịch vụ và Đối tác") {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
          }
        }
      }
    });

    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.item = data;
      for (let i = 0; i < this.item.length; i++) {
        if (this.item[i].Parent && (this.item[i].Parent.Name === this.LANGUAGE.SERVICE_AND_PARTNER || this.item[i].Parent.Japanese_Name === this.LANGUAGE.SERVICE_AND_PARTNER)) {

          if (this.serviceDataActive == undefined) {
            this.serviceDataActive = this.item[i];
            //console.log(this.item[i]);
          }

          this.itemData.push(this.item[i]);
        }
      }
      if (this.itemData !== undefined && !hasData) {
        this.itemContents.japaneseContents = this.itemData[0].contents.Japanese_Content;
        this.serviceJpContent = this.santized.bypassSecurityTrustHtml(this.itemContents.japaneseContents);
        this.itemContents.japaneseName = this.itemData[0].contents.Japanese_Name;
        this.itemContents.vietnameseContents = this.itemData[0].contents.Content;
        this.serviceContent = this.santized.bypassSecurityTrustHtml(this.itemContents.vietnameseContents);
        this.itemContents.vietnameseName = this.itemData[0].contents.Name;
      }
    });
  }

  onmoveFn(data: NgxCarouselStore) { };

  selectItem(id) {
    //console.log(id);
    let tempContents;
    let vietnameseSlug;
    let itemContentURL = this.apiCategories + '/' + id;
    this.http.get(itemContentURL).subscribe(data => {
      tempContents = data;
      this.itemContents.vietnameseContents = tempContents.contents.Content;
      this.serviceContent = this.santized.bypassSecurityTrustHtml(this.itemContents.vietnameseContents);
      this.itemContents.vietnameseName = tempContents.contents.Name;
      vietnameseSlug = tempContents.contents.Slug;
      this.serviceDataActive = tempContents;
      this.slug.vietnameseSlug = vietnameseSlug.substring(vietnameseSlug.lastIndexOf("/"),vietnameseSlug.length);
      window.location.hash = (this.slug.vietnameseSlug);
      this.itemContents.japaneseContents = tempContents.contents.Japanese_Content;
      this.serviceJpContent = this.santized.bypassSecurityTrustHtml(this.itemContents.japaneseContents);
      this.itemContents.japaneseName = tempContents.contents.Japanese_Name;
    });
  }

  back(){
    this.selectItem("5bffd860a929700548a09665");
    this.router.navigate(['/','dich-vu-doi-tac'],{relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id : "5bffd860a929700548a09665" }});
  }
}