import { Component, OnInit } from '@angular/core';
// Jquery lib
import * as $ from 'jquery';
// axios
import axios from 'axios';
import { from } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {

  }
  logout(){
   window.onbeforeunload = function() {
    localStorage.removeItem('firstChar');
    return '';
  };
  window.location.reload();
  }
}
