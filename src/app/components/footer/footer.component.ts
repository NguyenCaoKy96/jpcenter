import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ GetDataService ]
})
export class FooterComponent implements OnInit {
  public logo ='./assets/images/logo.png';
  private _footerURL: string;
  public footerData: any;
  public LANGUAGE : any = LANG_VI;
  public address: string;
  public tel: string;
  public hotline: string;
  public email: string;

  constructor(
    private _http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute
  ) { }
  ngOnInit() {
    // Change language
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });
    this._footerURL = this._getDataService.getContactURL();
     //Scroll the mouse and call the scrollFunction
     window.onscroll = () => {
      $('#backToTop').attr('title', this.LANGUAGE.BACK_TO_TOP);
      scrollFunction();
    };

     function scrollFunction() {
         // Check the cursor current position 
         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
             document.getElementById("backToTop").style.display = "block";
         } else {
             document.getElementById("backToTop").style.display = "none";
         }
     }

     // Click button to back to top of page
     document.getElementById('backToTop').addEventListener("click", function(){
         document.body.scrollTop =  $("html, body").animate({ scrollTop: 0 }, "slow");
     });

    // Get infomation from server
    this._http.get(this._footerURL).subscribe(data => {
      this.footerData = data;
      this.tel = this.footerData[0].Tel;
      this.email = this.footerData[0].Email;
      this.hotline = this.footerData[0].Hotline;
      this._route.queryParams.subscribe(data => {
        if (data.lang === 'vi') {
          this.address = this.footerData[0].Address;
        } else {
          this.address = this.footerData[0].Japanese_Address;
        }
      });
    });
    }

  // Change social icon when hover on it
  changeIcon(icon: string) {
      if (icon === "facebook") {
        $('#facebook-icon').attr("src","./assets/images/facebook-logo-hover.png");
      } else if (icon === "youtube") {
        $('#youtube-icon').attr("src","./assets/images/youtube-logo-hover.png");
      } else if (icon === "facebook-normal") {
        $('#facebook-icon').attr("src","./assets/images/facebook-logo.png");
      } else if (icon === "youtube-normal") {
        $('#youtube-icon').attr("src","./assets/images/youtube-logo.png");
      }
  }
}