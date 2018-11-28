import { Component, OnInit } from '@angular/core';
// Jquery lib
import * as $ from 'jquery';
// axios
import axios from 'axios';
import { text } from '@angular/core/src/render3/instructions';

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

  constructor() { }

  ngOnInit() {      
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
    .post('http://10.1.0.66:1337/auth/local',
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
          window.open('http://10.1.0.66:1337/admin/')
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
