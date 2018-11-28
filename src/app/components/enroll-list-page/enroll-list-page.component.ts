import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../services/get-data/get-data.service';
import { GetImagesService } from './../../services/get-image-slider/get-images.service';
import * as $ from 'jquery';

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enroll-list-page',
  templateUrl: './enroll-list-page.component.html',
  styleUrls: ['./enroll-list-page.component.scss']
})
export class EnrollListPageComponent implements OnInit {
  private enrollListURL: string ;
  public enrollListData;
  public contactedStudentList: any;
  public LANGUAGE: any;
  public status: string;

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
        this.LANGUAGE = LANG_JP;
      } else {
        this.LANGUAGE = LANG_VI;
      }
    });
    this._titleService.setTitle(this.LANGUAGE.ENROLL_LIST);
    
  }

  contactedList() {
    this.status = 'contacted';
    this.http.get(this.enrollListURL).subscribe(data => {
      this.enrollListData = data;
      this.contactedStudentList = this.enrollListData.filter((data) => {
        return data.Status === 'Đã liên hệ'
      })
    });
  }

  uncontactedList() {
    this.status = 'uncontacted';
    this.http.get(this.enrollListURL).subscribe(data => {
      this.enrollListData = data;
      this.contactedStudentList = this.enrollListData.filter((data) => {
        return data.Status === 'Chưa liên hệ'
      })
    });
  }

  onCheck(evt, item) {
    let itemContacted = {
      Status: "Đã liên hệ"
    };
    let itemUnContacted = {
      Status: "Chưa liên hệ"
    };
    if (evt.target.checked) {
      this.http.put(this.enrollListURL + '/' + item.id, itemContacted).subscribe(data => {
      });
    } else {
      this.http.put(this.enrollListURL + '/' + item.id, itemUnContacted).subscribe(data => {
      });
    }
  }
  // search
  // myFunction(evt, item) {
  //   var input, filter, table, tr, td, i, txtValue;
  //   input = document.getElementById("myInput");
  //   filter = input.value.toUpperCase();
  //   table = document.getElementById("myTable");
  //   tr = table.getElementsByTagName("tr");
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td")[0];
  //     if (td) {
  //       txtValue = td.textContent || td.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }       
  //   }
  // }
}
