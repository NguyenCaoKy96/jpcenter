import { Component, OnInit, NgModule, Output, Input, EventEmitter } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// _http built-in service
import { HttpClient } from '@angular/common/http';

// Jquery
import * as $ from 'jquery';

// Axios
import axios from 'axios';

// Session
// import session from 'client-sessions';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';
import { checkAndUpdateBinding } from '@angular/core/src/render3/instructions';

import { ActivatedRoute, Router } from '@angular/router';

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

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

  @Output('isChangeLanguage') language = new EventEmitter<boolean>();

  // Vietnamese is default language
  public lang: string = 'vi';
  constructor(
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit() {
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
         

  }

  changeURL(parentID: string, path?: string) {
    let parentPathName = $('#' + parentID)[0].pathname;
    if (path) {
      this.router.navigate([parentPathName, path], {relativeTo: this._activatedRoute, queryParams: { lang: this.lang?'vi':'jp' }});
    }
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
  }
}