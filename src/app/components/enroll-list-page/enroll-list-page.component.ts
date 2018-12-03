import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

import { ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { Enroll } from './enroll-list-page.class';

@Component({
  selector: 'app-enroll-list-page',
  templateUrl: './enroll-list-page.component.html',
  styleUrls: ['./enroll-list-page.component.css']
})
export class EnrollListPageComponent implements OnInit {
  private enrollListURL: string;
  public enrollListData;
  public contactedStudentList: any;
  public LANGUAGE: any;
  public status: string;
  EnrollListData: string;
  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) {
    this.enrollListURL = this._getDataService.getEnrollListURL();
    // search 
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
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
  }

  contactedList() {
    this.status = 'contacted';
    this.http.get(this.enrollListURL).subscribe(data => {
      this.enrollListData = data;
      for (var i=0;i<this.enrollListData.length; i++) {
        if (this.enrollListData[i].Status === this.LANGUAGE.CONTACTED_LIST) {
          this.EnrollListData = this.enrollListData[i]
        } 
      }
      this.EnrollListData = this.enrollListData.filter((data) => {
        return data.Status === this.LANGUAGE.CONTACTED_LIST
      })
    });
    $('#button').show();
  }

  uncontactedList() {
    this.status = 'uncontacted';
    this.http.get(this.enrollListURL).subscribe(data => {
      this.enrollListData = data;
      for (var i=0;i<this.enrollListData.length; i++) {
        if (this.enrollListData[i].Status === this.LANGUAGE.UN_CONTACTED_LIST) {
          this.EnrollListData = this.enrollListData[i]
          //console.log( this.EnrollListData);
        } 
      }
       this.EnrollListData = this.enrollListData.filter((data) => {
         return data.Status === this.LANGUAGE.UN_CONTACTED_LIST
       })
    });
    $('#button').hide();
  }

  onCheck(evt, item) {
    let itemContacted = {
      Status: this.LANGUAGE.CONTACTED_LIST
    };
    let itemUnContacted = {
      Status: this.LANGUAGE.UN_CONTACTED_LIST
    };
    if (evt.target.checked) {
      this.http.put(this.enrollListURL + '/' + item.id, itemContacted).subscribe(data => {
      });
    } else {
      this.http.put(this.enrollListURL + '/' + item.id, itemUnContacted).subscribe(data => {
      });
    }
  }
  onSubmit(){

    var enroll : Enroll = {
      Fullname: '#fullname',
      Email: $('td'),
      Phone: $('td'),
      Class: $('td'),
    }
     // Check whether content is invalid or epmty
     if (enroll.Fullname === '' || enroll.Class === '' 
     || enroll.Email === '' || enroll.Phone === ''){
      console.log(enroll)
      }
    else{
      this.http.post('http://10.1.0.66:1336/students', JSON.stringify(enroll)).subscribe(data => {
        console.log(data);
    });
      alert("Đưa vào lớp thành công")
    }
  }

}
