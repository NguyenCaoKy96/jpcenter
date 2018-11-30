import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public page = 'one';
  public LANGUAGE: any = LANG_VI;

  @Input('islanguage') language;
  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit() {
    // Change language
    this._activatedRoute.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });

    this._titleService.setTitle(`${this.LANGUAGE.HOME_PAGE}`);
  }
}
