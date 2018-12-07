import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';

// Language
import { default as LANG_VI } from './../../../lang/lang_vi';
import { default as LANG_JP } from './../../../lang/lang_jp';
import * as $ from 'jquery';


@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',

  styleUrls: ['./sub-menu.component.css'],
  providers: [
    GetDataService]
})

export class SubMenuComponent implements OnInit {

  public LANGUAGE : any;
  public isVietnamese: boolean = true;
  lang: string;
  public
  headerURL: string;
  headerData;
  CategoriesURL: string;
  CategoriesData;
  introductionURL: string;
  introductionData;
  getJobsURL: string;
  jobs;
  getServicesURL: string;
  services;
  courseDataItem: any;
  servicesItem;
  jobsItem;
  introductonItem;
  jpintroduction;
  jpcourse;
  jpjobs;
  jbservices;
  menuLeftData:any=[];
  categoriesData:any;
  introductionsDataActive:any;

  // Side navigation item
  apiCategories: string;
  intro: any;
  service: any;
  career: any;
  linkIntoVietnamese: any;
  linkServiceVietnamese: any;
  linkCareerVietnamese: any;
  introData: any = [];
  serviceData: any = [];
  careerData: any = [];
  itemContents: any = {
    vietnameseName: '',
    japaneseName: '',
    vietnameseContents : '',
    japaneseContents : ''
  };
  slug: any = {
    vietnameseSlug : '',
    japaneseSlug : ''
  };

  headers = [];
  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    // Get data introduction
    let categoriesURL = this._getDataService.getCategoriesURL();
    this.http.get(categoriesURL).subscribe(data => {
      this.categoriesData = data;

      for(var i=0; i<this.categoriesData.length; i++) {
        if(this.categoriesData[i].Parent && (this.categoriesData[i].Parent.Name === this.LANGUAGE.INTRODUCTION_PAGE  || this.categoriesData[i].Parent.Japanese_Name === this.LANGUAGE.INTRODUCTION_PAGE )) {
          
          if(this.introductionsDataActive == undefined){
            this.introductionsDataActive = this.categoriesData[i];
          }
          this.menuLeftData.push(this.categoriesData[i]);
        }
      }

    });

    // Get data services
    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.service = data;
      for (let i=0; i< this.service.length; i++) {
        if (this.service[i].Parent && (this.service[i].Parent.Name === this.LANGUAGE.SERVICE_AND_PARTNER || this.service[i].Parent.Japanese_Name === this.LANGUAGE.SERVICE_AND_PARTNER)) {
          this.serviceData.push(this.service[i]);
        }
      }
    });

    // Get data career
    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.career = data;
      for (let i=0; i< this.career.length; i++) {
        if (this.career[i].Parent && (this.career[i].Parent.Name === this.LANGUAGE.CAREER_OPPOTUNITY || this.career[i].Parent.Japanese_Name === this.LANGUAGE.CAREER_OPPOTUNITY)) {
          this.careerData.push(this.career[i]);
        }
      }
    });
  }

  ngOnInit() {

     // Change language
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
    }); 

    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }

  selectService(service) {
    this.router.navigate(['/','dich-vu-doi-tac'], {relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  service._id }});
  }

  selectCareer(career) {
    this.router.navigate(['/','co-hoi-nghe-nghiep'], {relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  career._id }});
  }
}