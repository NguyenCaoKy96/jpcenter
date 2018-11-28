import { Component, OnInit,Input } from '@angular/core';
import {Title} from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public page='one';
@Input('islanguage') language;
constructor(private titleService: Title) {
}
  ngOnInit() {
    this.titleService.setTitle('Trang chủ');
    
  }
}
