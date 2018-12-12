import { Component, OnInit, NgModule, Output, Input, EventEmitter } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// _http built-in service
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

// Jquery
import * as $ from 'jquery';

// Axios
import axios from 'axios';

// Session
// import session from 'client-sessions';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { checkAndUpdateBinding } from '@angular/core/src/render3/instructions'

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ GetDataService ]
})

export class HeaderComponent implements OnInit {
  public headerURL: string;
  public data: any;
  public footerURL: string;
  public footerData: any;
  public name: any;
  public email: string;
  public phone: string;
  public notes: any;
  public LANGUAGE: any = LANG_VI;
  menuLeftData:any=[];
  categoriesData:any;
  introductionsDataActive:any;
  public apiCategories: string;
  public item:any;
  public itemData: any = [];
  public itemData1: any=[];
  public isVietnamese: boolean;
  //course
  Contents;
  skillDataItem;
  skillsURL: string;
  skillsData;
  japanSkillDataItem;
  japanchildDataItem;
  japanContents;
  japanchildContent;
  jlptUrl;
  jlptdata;
  jlptDataItem;
  japanjlptName;
  jlptContent;
  childrensURL;
  childrensData;
  childDataItem


  @Output('isChangeLanguage') language = new EventEmitter<boolean>();

  // Vietnamese is default language
  public lang: string = 'vi';
  constructor(
    private _titleService: Title,
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private http: HttpClient,


  ) { 
      // Get children data
      this.childrensURL = this._getDataService.getschildrenURL();
      this.http.get(this.childrensURL).subscribe(data => {
        this.childrensData = data;
        this.childDataItem = this.childrensData.Name;
        this.japanchildDataItem = this.childrensData.Japanese_Name;
      });
    //  Get jlpt data
    this.jlptUrl = this._getDataService.getjlptURL();
      this.http.get(this.jlptUrl).subscribe(data =>{
        this.jlptdata = data;
        this.jlptDataItem = this.jlptdata.Name;
        this.japanjlptName = this.jlptdata.Japanese_Name ;
      }); 
      // Get skill data
      this.skillsURL = this._getDataService.getSkillURL();
      this.http.get(this.skillsURL).subscribe(data => {
        this.skillsData = data;
        this.skillDataItem = this.skillsData.Name;
        this.japanSkillDataItem = this.skillsData.Japanese_Name;      
      });
    // get data introduction
    let categoriesURL = this._getDataService.getCategoriesURL();
    this._http.get(categoriesURL).subscribe(data => {
      this.categoriesData = data;
      // console.log('All categories',this.categoriesData);

      for(var i=0; i<this.categoriesData.length; i++) {
        if(this.categoriesData[i].Parent && (this.categoriesData[i].Parent.Name === this.LANGUAGE.INTRODUCTION_PAGE  || this.categoriesData[i].Parent.Japanese_Name === this.LANGUAGE.INTRODUCTION_PAGE )) {
          
          if(this.introductionsDataActive == undefined){
            this.introductionsDataActive = this.categoriesData[i];
          }
          
          this.menuLeftData.push(this.categoriesData[i]);
        }
      }

    });}
  
  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.lang = 'vi';
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.lang ='jp';
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
    });

  // Header URL
    this.headerURL = this._getDataService.getHeaderURL();
    
    // Footer URL
    this.footerURL = this._getDataService.getContactURL();

    // Make Menu bar attach on browser upper edge
    $(document).ready(function () {
      var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
        var stickyHeight = sticky.outerHeight();
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop) {
          stickyWrapper.height(stickyHeight);
          sticky.addClass("is-sticky");
        } else {
          sticky.removeClass("is-sticky");
          stickyWrapper.height('auto');
        }
      };

      $('[data-toggle="sticky-onscroll"]').each(function () {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); 
        sticky.before(stickyWrapper);
        sticky.addClass('sticky');

        // Resize element when scroll
        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
          stickyToggle(sticky, stickyWrapper, $(this));
        });
        stickyToggle(sticky, stickyWrapper, $(window));
      });
              
      $(document).ready(function($) {
        var topFixMenu = $("#logo-hide");
        $(window).scroll(function() {
          // Show scroll top icon if height scrolled greater than 50px
          if($(this).scrollTop() > 50) {              
            topFixMenu.show();
          } else {
            topFixMenu.hide();
          }
        })                  
      })
    });

    //Get Header data
    this._http.get(this.headerURL).subscribe(data => {
      this.data = data;
    });  

     // Get Footer data
    this._http.get(this.footerURL).subscribe(data => {
      this.footerData = data;
    }); 
    //Get sub-menu header for career-oppotunity and service-partner
    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.item = data;
      //console.log(this.item);
      for (let i=0; i< this.item.length; i++) {
        if (this.item[i].Parent && (this.item[i].Parent.Name === this.LANGUAGE.CAREER_OPPOTUNITY || this.item[i].Parent.Japanese_Name === this.LANGUAGE.CAREER_OPPOTUNITY)) {
          this.itemData.push(this.item[i]);
        }
        if (this.item[i].Parent && (this.item[i].Parent.Name === this.LANGUAGE.SERVICE_AND_PARTNER || this.item[i].Parent.Japanese_Name === this.LANGUAGE.SERVICE_AND_PARTNER)){
          this.itemData1.push(this.item[i]);}
      }
    });    

  }
 onChangeIntroduction(item){
    this.introductionsDataActive  = item;
  }
  changeURL(parentID: string, path?: string) {
    let parentPathName = $('#' + parentID)[0].pathname;
    if (path) {
      this.router.navigate([parentPathName, path], {relativeTo: this._activatedRoute, queryParams: { lang: this.lang?'vi':'jp' }});
    }
  }
//routerlink for Career-Oppotunity
  changeCareer(item){
    this.router.navigate(['/','co-hoi-nghe-nghiep'], {relativeTo: this._activatedRoute, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  item._id }});
  }
  //routerlink for Service
  changeService(item){ 
    this.router.navigate(['/','dich-vu-doi-tac'],{relativeTo: this._activatedRoute, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  item._id }});
  }

  // Handle when click on Change language icon
  changeLanguage (language) {
    this.lang = language;
    if (this.lang) {
      this.LANGUAGE = LANG_VI;
      $('.current-language').attr('src', './../assets/images/vietnam-flag.png');
    } else {
      this.LANGUAGE = LANG_JP;
      $('.current-language').attr('src', './../assets/images/japan-flag.png');
    }
    this.language.emit(language)
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    this.router.navigate(['/' + urlWithoutParams], { queryParams: { lang: this.lang?'vi':'jp' } });
    if (!this.lang) {
      $('#bubble').addClass('verticle-align');
    } else {
      $('#bubble').removeClass('verticle-align');
    }

    // Get Title for each Header and menu bar
    let title = this._titleService.getTitle();
    if(title === LANG_VI.HOME_PAGE || title === LANG_JP.HOME_PAGE){
      this._titleService.setTitle(this.LANGUAGE.HOME_PAGE);
    } 
     if(title === LANG_VI.INTRODUCTION_PAGE || title === LANG_JP.INTRODUCTION_PAGE){
      this._titleService.setTitle(this.LANGUAGE.INTRODUCTION_PAGE);
    } 
    if(title === LANG_VI.ACADEMIC || title === LANG_JP.ACADEMIC){
      this._titleService.setTitle(this.LANGUAGE.ACADEMIC);
    } 
    if(title === LANG_VI.COURSE || title === LANG_JP.COURSE){
      this._titleService.setTitle(this.LANGUAGE.COURSE);
    } 
    if(title === LANG_VI.NEWS_AND_EVENTS || title === LANG_JP.NEWS_AND_EVENTS){
      this._titleService.setTitle(this.LANGUAGE.NEWS_AND_EVENTS);
    } 
    if(title === LANG_VI.SERVICE_AND_PARTNER || title === LANG_JP.SERVICE_AND_PARTNER){
      this._titleService.setTitle(this.LANGUAGE.SERVICE_AND_PARTNER);
    } 
    if(title === LANG_VI.CAREER_OPPOTUNITY || title === LANG_JP.CAREER_OPPOTUNITY){
      this._titleService.setTitle(this.LANGUAGE.CAREER_OPPOTUNITY);
    } 
  }

}