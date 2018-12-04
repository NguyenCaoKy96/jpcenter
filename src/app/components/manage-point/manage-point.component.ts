import { Component, OnInit } from '@angular/core';
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-manage-point',
  templateUrl: './manage-point.component.html',
  styleUrls: ['./manage-point.component.css']
})
export class ManagePointComponent implements OnInit {
	markURL: string;
  markData;
  classURL: string;
  classData;
    public LANGUAGE: any = LANG_VI;
  constructor(private http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute) {
  	 this._route.queryParams.subscribe(data => {
        if (data.lang === 'vi') {
          this.LANGUAGE = LANG_VI;
        } else {
          this.LANGUAGE = LANG_JP;
        }
      });
       //search 
    $(document).ready(function(){
      $('select').on('change', function(){
        // alert(this.value[1]);
        var value = $(this).val().toLowerCase();
       $("#IdTable tr").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
       console.log(value);
      });
    });

     }

  ngOnInit() {
    //get data Mark
  	this.markURL = this._getDataService.getMarkURL();
  	this.http.get(this.markURL).subscribe(data =>{
  	this.markData = data;
    console.log(data);
  	});

    //get data manage-point
    this.classURL = this._getDataService.getClassesURL();
    this.http.get(this.classURL).subscribe(data =>{
      this.classData = data;
    });
  }
  		
}
