import { Component, OnInit } from '@angular/core';
import { Title, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Observable, BehaviorSubject, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

// Language
import { default as LANG_VI } from './../../../lang/lang_vi';
import { default as LANG_JP } from './../../../lang/lang_jp';

@Component({
  selector: 'app-career-opportunities',
  templateUrl: './career-opportunities.component.html',
  styleUrls: ['./career-opportunities.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class CareerOpportunitiesComponent implements OnInit {

  public carouselConfig: NgxCarousel;
  public LANGUAGE: any = LANG_VI;
  public isVietnamese: boolean = true;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  serverURL: any;
  data: any;
  careerItemData: any;
  careerDataActive: any;
  lang: string;
  careerContent: SafeHtml;
  careerJpContent: SafeHtml;

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
    private router : Router,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private santized: DomSanitizer
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

    this._titleService.setTitle(this.LANGUAGE.CAREER_OPPOTUNITY);

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
      console.log(this.item);
      for (let i = 0; i < this.item.length; i++) {
        if (this.item[i].Parent && (this.item[i].Parent.Name === this.LANGUAGE.CAREER_OPPOTUNITY || this.item[i].Parent.Japanese_Name === this.LANGUAGE.CAREER_OPPOTUNITY)) {

          if (this.careerDataActive == undefined) {
            this.careerDataActive = this.item[i];
          }
          this.itemData.push(this.item[i]);
        }
      }
      if (this.itemData !== undefined && !hasData) {
        this.itemContents.japaneseContents = this.itemData[0].contents.Japanese_Content;
        this.careerJpContent = this.santized.bypassSecurityTrustHtml(this.itemContents.japaneseContents);
        this.itemContents.japaneseName = this.itemData[0].contents.Japanese_Name;
        this.itemContents.vietnameseContents = this.itemData[0].contents.Content;
        this.careerContent = this.santized.bypassSecurityTrustHtml(this.itemContents.vietnameseContents);
        this.itemContents.vietnameseName = this.itemData[0].contents.Name;
      }
    });
  }

  onmoveFn(data: NgxCarouselStore) { };

  selectItem(id) {
    let tempContents;
    let vietnameseSlug;
    let itemContentURL = this.apiCategories + '/' + id;
    this.http.get(itemContentURL).subscribe(data => {
      tempContents = data;
      this.itemContents.vietnameseContents = tempContents.contents.Content;
      this.careerContent = this.santized.bypassSecurityTrustHtml(this.itemContents.vietnameseContents);
      this.itemContents.vietnameseName = tempContents.contents.Name;
      this.careerDataActive = tempContents;
      vietnameseSlug = tempContents.contents.Slug;
      this.slug.vietnameseSlug = vietnameseSlug.substring(vietnameseSlug.lastIndexOf("/"),vietnameseSlug.length);
      window.location.hash = (this.slug.vietnameseSlug);
      this.itemContents.japaneseContents = tempContents.contents.Japanese_Content;
      this.careerJpContent = this.santized.bypassSecurityTrustHtml(this.itemContents.japaneseContents);
      this.itemContents.japaneseName = tempContents.contents.Japanese_Name;
    });
  }

  back(){
    this.selectItem("5bffd8aba929700548a0967a");
    this.router.navigate(['/','co-hoi-nghe-nghiep'],{relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  "5bffd8aba929700548a0967a" }});
  }
}
