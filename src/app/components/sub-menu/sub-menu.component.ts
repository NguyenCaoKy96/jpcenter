import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',

  styleUrls: ['./sub-menu.component.css'],
  providers: [
    GetDataService]
})
export class SubMenuComponent implements OnInit {
    lang: string = "vi";   
    public 
    headerURL:string;
    headerData;
    CategoriesURL:string;
    CategoriesData;
    introductionURL:string;
    introductionData; 
    getJobsURL : string;
    jobs;
    getServicesURL : string;
    services;
    courses: any;
    courseData: any;
    courseDataItem: any;
    servicesItem;
    jobsItem;
    introductonItem;
    jpintroduction;
    jpcourse;
    jpjobs;
    jbservices;

    headers = [];
  constructor(
    private http: HttpClient,
    private _getDataService: GetDataService,
  	private route: ActivatedRoute
  ) { 
      // get data introduction
      this.introductionURL = this._getDataService.getIntroducesURL();
      this.http.get(this.introductionURL).subscribe(data => {
       this.introductionData = data;
     });
     // get data jobs
     this.getJobsURL = this._getDataService.getJobsURL();
     this.http.get(this.getJobsURL).subscribe(data => {
      this.jobs = data;
    });
        // get data services
        this.getServicesURL = this._getDataService.getServicesURL();
        this.http.get(this.getServicesURL).subscribe(data => {
          this.services = data;         
        });

      // Get data courses
      this.headerURL = this._getDataService.getHeaderURL();
      this.http.get(this.headerURL).subscribe(data => {
        this.courses = data;
        for (var i=0; i< this.courses.length; i++) {
          if (this.courses[i].Name === "Khóa học") {
            this.courseData = this.courses[i].Name;
            this.courseDataItem = this.courses[i].categories;
            this.jpcourse = this.courses[i].Japanese_Name;
          }
          if (this.courses[i].Name === "Dịch vụ & Đối tác") {
            this.servicesItem = this.courses[i].Name;
            this.jbservices = this.courses[i].Japanese_Name;
          }
          if (this.courses[i].Name === "Giới thiệu") {
            this.introductonItem = this.courses[i].Name;
            this.jpintroduction = this.courses[i].Japanese_Name;
          }
          if (this.courses[i].Name === "Cơ hội nghề nghiệp") {
            this.jobsItem = this.courses[i].Name;
            this.jpjobs = this.courses[i].Japanese_Name;
          }
        }
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }
  
}
