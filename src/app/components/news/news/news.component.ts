import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { GetDataService } from './../../../services/get-data/get-data.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [GetDataService]
})
export class NewsComponent implements OnInit {
  lang: string;
  newsURL: string;
  newsData;
  news;
  nameNews;
  japannameNews;
  newsImage;
  news1;
  nameNews1;
  japannameNews1;
  newsImage1;
  news2;
  nameNews2;
  japannameNews2;
  newsImage2;
  news3;
  nameNews3;
  japannameNews3;
  newsImage3;

  constructor(
    private http: HttpClient,
    private _getDataService: GetDataService,
    private route: ActivatedRoute) {
    // get data introduction for card
    this.newsURL = this._getDataService.getNewsURL();
    this.http.get(this.newsURL).subscribe(data => {
      this.newsData = data ;
      this.news = this.newsData[0];
      this.nameNews = this.news.name;
      this.japannameNews = this.news.japanese_name;
      this.newsImage = 'http://10.1.0.66:1337' + this.news.image.url;
      this.news1 = this.newsData[1];
      this.nameNews1 = this.news1.name;
      this.japannameNews1 = this.news1.japanese_name;
      this.newsImage1 = 'http://10.1.0.66:1337' + this.news1.image.url;
      this.news2 = this.newsData[2];
      this.nameNews2 = this.news2.name;
      this.japannameNews2 = this.news2.japanese_name;
      this.newsImage2 = 'http://10.1.0.66:1337' + this.news2.image.url;
      this.news3 = this.newsData[3];
      this.nameNews3 = this.news3.name;
      this.japannameNews3 = this.news3.japanese_name;
      this.newsImage3 = 'http://10.1.0.66:1337' + this.news3.image.url;
    });
 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }

}
