import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';
import * as $ from 'jquery';
import axios from 'axios';
import { AbstractControl } from '@angular/forms';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
  selector: 'app-bubble-enroll',
  templateUrl: './bubble-enroll.component.html',
  styleUrls: ['./bubble-enroll.component.css'],
  providers: [GetDataService]
})

export class BubbleEnrollComponent implements OnInit {
  public frmUser: FormGroup;
  registerURL: string;
  registerData;
  public LANGUAGE: any = LANG_VI;

  constructor(
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    // Get data register page
    this.registerURL = this._getDataService.getClassesURL();
    this.http.get(this.registerURL).subscribe(data => {
      this.registerData = data;
    });
  }
  ngOnInit() {

    // Get language
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });

    $(function ($) {
      var validation_holder;
      $("form#register_form button[name='submit']").click(function () {
        var validation_holder = 0;
        var name = $('#name').val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var course = $("#course").val();
        var notes = $("#notes").val();
        if (validation_holder == 1) {
          // if have a field is blank, return false	
          return;
        } else {
          $.post('http://103.199.7.56:1336/registers', {
            Fullname: name,
            Email: email,
            Phone: phone,
            Class: course,
            Notes: notes,
          }, function (data) {
            alert("Bạn đã đăng ký thành công..!.");
            window.location.reload();
          });
        }
      });
    });

    this.createForm();

  }

  // Trim space at the start and end position of name string
  onNameBlur() {
    let name = $('#name').val($('#name').val().trim());
    return name;
  }
  onNoteBlur() {
    let note = $('#notes').val($('#notes').val().trim());
    return note;
  }


  // Valid form with Regex
  createForm() {
    this.frmUser = this._formBuilder.group({
      fullname: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+$'),
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)*'),
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('(09|08|07|06|05|04|03)+([0-9]{8})'),
      ]],
      course: ['', Validators.required],
      notes: ['',]
    });
  }

  /*
  *  Handler when submit form
  */
  onSubmitForm() {
    console.log(this.frmUser);
  }
}