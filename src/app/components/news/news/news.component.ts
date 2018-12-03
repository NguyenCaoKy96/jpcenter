import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

// Service
import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [
    GetDataService,
    GetImagesService
  ]
})

export class NewsComponent implements OnInit {

  lang: string;

  newWhyQnuURL: string;
  newWhyQnuData: any;
  newWhyQnuName: any;
  newWhyQnuJapanName: any;
  imageWhyQnu: any;
  linkWhyQNU: any;

  newProjectURL: string;
  newProjectData: any;
  newProjectName: any;
  newProjectJapanName: any;
  imageProject: any;
  linkProject: any;

  newJobURL: string;
  newJobData: any;
  newJobName: any;
  newJobJapanName: any;
  imageJob: any;
  linkJob: any;

  newIntroducURL: string;
  newIntroData: any;
  newIntroName: any;
  newIntroJapanName: any;
  imageIntro: any;
  linkIntro: any;

  carouselBanner: any;
  imageURLs: any;
  sliderImages: any[] = [];
  sliderImagesURL: { [key: number]: string } = [];
  data: any;
  serverURL: string;

  constructor(
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) {
    this.serverURL = this._getDataService.serverURL;

    // Get news Why QNU
    this.newWhyQnuURL = this._getDataService.getNewWhyQnuURL();
    this._http.get(this.newWhyQnuURL).subscribe(data => {
       this.newWhyQnuData = data;
       this.newWhyQnuName = this.newWhyQnuData.Name;
       this.newWhyQnuJapanName = this.newWhyQnuData.Japanese_Name;
       this.imageWhyQnu = this.serverURL + this.newWhyQnuData.Image.url;
       this.linkWhyQNU = this.newWhyQnuData.Slug;
    });

    // Get news Project
    this.newProjectURL = this._getDataService.getNewProjectURL();
    this._http.get(this.newProjectURL).subscribe(data => {
       this.newProjectData = data;
       this.newProjectName = this.newProjectData.Name;
       this.newProjectJapanName = this.newProjectData.Japanese_Name;
       this.imageProject = this.serverURL + this.newProjectData.Image.url;
       this.linkProject = this.newProjectData.Slug;
    });

    // Get news Introduction
    this.newIntroducURL = this._getDataService.getNewIntroducURL();
    this._http.get(this.newIntroducURL).subscribe(data => {
       this.newIntroData = data;
       this.newIntroName = this.newIntroData.Name;
       this.newIntroJapanName = this.newIntroData.Japanese_Name;
       this.imageIntro = this.serverURL + this.newIntroData.Image.url;
       this.linkIntro = this.newIntroData.Slug;
    });

    // Get news Job opportunities
    this.newJobURL = this._getDataService.getNewJobURL();
    this._http.get(this.newJobURL).subscribe(data => {
       this.newJobData = data;
       this.newJobName = this.newJobData.Name;
       this.newJobJapanName = this.newJobData.Japanese_Name;
       this.imageJob = this.serverURL + this.newJobData.Image.url;
       this.linkJob = this.newJobData.Slug;
    });

    // Get Image news
    this.carouselBanner = this._getImageService.carouselBanner;
    this.imageURLs = this._getDataService.getImagesURL();
    this.serverURL = this._getDataService.serverURL;
    this.data = this._getImageService.getImageFromServer();
    this.data.then(res => {
      this.sliderImages = res;
      for (var i = 0; i < this.sliderImages.length; i++) {
        if (this.sliderImages[i].Name === "Home_Image") {
          for (var k = 0; k < this.sliderImages[i].Image.length; k++) {
            this.sliderImagesURL[k] = this.serverURL + this.sliderImages[i].Image[k].url;
            // console.log( this.sliderImagesURL[k]);
          }
        }
      }
    });
   }

  ngOnInit() {
     
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }
}