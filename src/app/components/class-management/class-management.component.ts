import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {
  classURL: string ;
  classData;
  nameStudent;
  Classes;
  classItem;
  IDstudents:any = [];
  currentClassList: any;

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService
  ) { 
    this.classURL = this._getDataService.getClassesURL();
    this.http.get(this.classURL).subscribe(data => {
      this.classData = data; 
    });
  }

  // Get list of student in current class
  onChangeClass(className: any) {
    this.http.get(this.classURL).subscribe(data => {
      this.classItem = data;
      for (var i = 0; i < this.classItem.length; i++) {
        if (this.classItem[i].class === className) {
          this.currentClassList = this.classItem[i].StudentID;
        };
      }
    });
  }
  ngOnInit() { }
}