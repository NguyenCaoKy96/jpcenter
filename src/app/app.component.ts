import { Component , Input ,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Http } from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  public title = 'project';
  public language;
  public lang: any;
  param: any;

  constructor(
    private router: Router,
  ) {
    this.router.navigate(['/trang-chu'], { queryParams: { lang: 'vi'} });
  }

  ngOnInit() { 
  }
  changeLanguage ($event) {
    this.language = $event;
  }
}
