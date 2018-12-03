import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})

export class ClassManagementComponent implements OnInit {
  classURL: string;
  classData;
  nameStudent;
  Classes;
  classItem;
  IDstudents: any = [];
  currentClassList: any;
  public LANGUAGE : any = LANG_VI;
  public LANGUAGES: any ;

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) {
    this.classURL = this._getDataService.getClassesURL();
    this.http.get(this.classURL).subscribe(data => {
      this.classData = data;
      console.log(this.classData)
    });

  }

  // Get list of student in current class
  onChangeClass(className: any) {
    this.http.get(this.classURL).subscribe(data => {
      this.classItem = data;
      for (var i = 0; i < this.classItem.length; i++) {
        if (this.classItem[i].Class === className) {
          this.currentClassList = this.classItem[i].students;
          console.log(this.currentClassList)
        };
      }
    });
  }
  ngOnInit() {
    // Change language

    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGES = LANG_JP;
      }
    });
    $('.left-item').removeClass('active');
    if ($('.left-item')) {
      $($('.left-item').target).addClass('active');
    }
  }
}