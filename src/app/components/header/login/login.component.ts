import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
// Jquery lib
import * as $ from 'jquery';
// axios
import axios from 'axios';
import { text } from '@angular/core/src/render3/instructions';
import { GetDataService } from './../../../services/get-data/get-data.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  identifier: any;
  password: string;
  jwt: string;
  isshow:any='';
  user: any;
  users: any;
  firstChar: string = '';
  loginURL;

  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _getImageService: GetImagesService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {  
    this.loginURL = this._getDataService.getLoginURL();
    // get firsChar from user to view
    this.firstChar = localStorage.getItem("firstChar"); 
    if (this.firstChar !== '') {
      $('#login').text(this.firstChar);
    } 
  }
  check(){
    this.identifier = $('#uname1').val();
    this.password = $('#pwd1').val();
    axios
    .post(this.loginURL ,
    {
        identifier: this.identifier,
        password: this.password
    })
    .then(response => {
      this.user = response.data.user;
      this.jwt = response.data.jwt;
      if(this.user.username === this.identifier && this.jwt !== undefined)
      { 
        let length = this.user.username.length;
        
        if(length < 30){
          localStorage.setItem("firstChar", this.user.username);
          window.location.reload(true);  
        }
      }           
    })   
    .catch(error => {
      // Handle error.
      alert('Mật khẩu, tài khoản không đúng')
    });
  }
 }
