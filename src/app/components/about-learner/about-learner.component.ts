import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as $ from 'jquery';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';

// Carousel
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-about-learner',
  templateUrl: './about-learner.component.html',
  styleUrls: ['./about-learner.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})
export class AboutLearnerComponent implements OnInit {
  public LANGUAGE : any = LANG_VI;
  public isVietnamese: boolean = true;
  private serverURL: string;
  carouselBanner: any;
  imageURLs: any;
  homeImages: any[] = [];
  homeImagesURL: { [key: number]: string } = [];
  data: any;

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
    vietnameseContents : '',
    japaneseContents : ''
  };
  slug: any = {
    vietnameseSlug : '',
    japaneseSlug : ''
  };

  constructor(
    private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute,
    private _currentURL: Router
  ) { }

  ngOnInit() {
    /**
     * Handle for language when has a change language event fired
     */
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
    });
    this._titleService.setTitle(this.LANGUAGE.STUDENT);
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.homeImages = res;
      for (var i = 0; i < this.homeImages.length; i++) {
        if (this.homeImages[i].Name === this.LANGUAGE.STUDENT) {
          for (var k = 0; k < this.homeImages[i].Image.length; k++) {
            this.homeImagesURL[k] = this.serverURL + this.homeImages[i].Image[k].url;
          }
        }
      }
    });

    this.apiCategories = this._getDataService.getCategoriesURL();
    this._http.get(this.apiCategories).subscribe(data => {
      this.item = data;
      for (let i=0; i< this.item.length; i++) {
        if (this.item[i].Parent && (this.item[i].Parent.Name === this.LANGUAGE.STUDENT || this.item[i].Parent.Japanese_Name === this.LANGUAGE.STUDENT)) {
          this.itemData.push(this.item[i]);
        }
      }
    });
  }

  selectItem(item) {
    let tempContents;
    let vietnameseSlug;
      let itemContentURL = this.apiCategories + '/' + item._id;
      this._http.get(itemContentURL).subscribe(data => {
        tempContents = data;
        this.itemContents.vietnameseContents = tempContents.contents.Content;
        this.itemContents.vietnameseName =  tempContents.contents.Name;
        vietnameseSlug = tempContents.contents.Name;
        this.slug.vietnameseSlug = vietnameseSlug.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        window.location.hash = (this.slug.vietnameseSlug);
        this.itemContents.japaneseContents = tempContents.contents.Japanese_Content;
        this.itemContents.japaneseName = tempContents.contents.Japanese_Name;
      });
  }
}