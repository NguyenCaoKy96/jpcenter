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
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit() {
    // Header URL
    this.headerURL = this._getDataService.getHeaderURL();

    // Footer URL
    this.footerURL = this._getDataService.getFooterURL();

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
      console.log(data);
    });  


     // Get Footer data
    this._http.get(this.footerURL).subscribe(data => {
      this.footerData = data;
    }); 
         

    // $('#bubble').offset({top: 250})

    // var isMoving = false;
    // var isdragging = false;
    // var currentPos;
    // var afterPos;


    // $('#bubble').mousedown(function(){
    //   isdragging = false;
    //   currentPos = $('#bubble').offset().left + $('#bubble').offset().top;
    // });
    // $('#bubble').mousemove(function(){
    //   isdragging = true;
    //   $(this).css("transition", "all 0s");
    // });
    // $('#bubble').mouseup(function(e){
    //   e.preventDefault();
    //   var swidth = $( window ).width();
    //   var sheight = $( window ).height();
      
    //   if(isdragging){
    //     if($('#bubble').offset().left > (swidth/2)){
    //       $('#bubble').offset({left: swidth - $('#bubble').width()}).css("transition", "all 0.4s");
    //     }else{
    //       $('#bubble').offset({left: 0}).css("transition", "all 0.4s");
    //     }
    //   }
    //   afterPos = $('#bubble').offset().left + $('#bubble').offset().top;
    // });


    // $(window).scroll(function (event) {
    //     var scroll = $(window).scrollTop();
    //     if (scroll === $('#bubble').offset().top) {
    //       console.log(scroll);
    //       $('#bubble').offset({top: 0});
    //     }
    // });

    // $(window).resize(function(){
    //     $('#bubble').offset({left: 0}).css("transition", "all 0.4s");
    // });

    // $('#bubble').click(() => {
    //   if (afterPos === currentPos) {  
    //     this.router.navigate(['/dang-ky-hoc']);  
    //   }
    // });

    // $('.write').click(() => {
    //   if (afterPos === currentPos) {  
    //     this.router.navigate(['/viet-bai']);  
    //   }
    // });

    // $('#bubble').removeClass('verticle-align');
  }

  changeURL(parentID: string, path?: string) {
    let parentPathName = $('#' + parentID)[0].pathname;
    if (path) {
      this.router.navigate([parentPathName, path], {relativeTo: this.activatedRoute, queryParams: { lang: this.lang?'vi':'jp' }});
    }
  }

  // Handle when click on Change language icon
  changeLanguage (language) {
    this.lang = language;
    if (this.lang) {
      this.LANGUAGE = LANG_VI;
    } else {
      this.LANGUAGE = LANG_JP;
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