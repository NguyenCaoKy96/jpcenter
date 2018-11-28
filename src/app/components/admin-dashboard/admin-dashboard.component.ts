import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { GetDataService } from './../../services/get-data/get-data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { News } from './news-frame.class';
import { Introduces } from './introduces-frame.class';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    providers: [ GetDataService ]
})

export class AdminDashboardComponent implements OnInit {
    // Config for CKEditor
    public Editor = ClassicEditor;
    public isDisabled = false;
    public config = { };

    headerData: any;
    headerSubCategories: any;
    categoriesDropdown: any;
    subCategoriesDropDown: any[];
    subCategories: any;
    tempData: any;
    tempDataOnPost: any;
    categoriesSlug: any;
    newsURL: string;
    introduceURL: string;

    // Two way data binding of CKEditor
    public model = {
        editorDataVi: 'Nhập nội dung',
        editorDataJp: 'コンテンツを追加'
    };

    constructor(
        private http: HttpClient,
        private _getDataService: GetDataService
    ) { }

    // Detect value of "categories" dropdown when change its value
    detectCategoriesValue() {}

    ngOnInit() {
        this.newsURL = this._getDataService.getNewsURL();
        this.introduceURL = this._getDataService.getIntroducesURL();
        
        this.http.get(this._getDataService.getHeaderURL())
        .subscribe(data => {
            this.headerData = data;
        });

        // Get sub-categories of each categories when choose a categories
        $('#categories').on("change", () => {
            this.categoriesDropdown = $('#categories').val();
            this.http.get(this._getDataService.getHeaderURL())
            .subscribe(data => {
                this.tempData = data;
                for (var i=0; i<this.tempData.length; i++) {
                    if (this.tempData[i].Name === this.categoriesDropdown) {
                        this.subCategoriesDropDown = this.tempData[i].categories;
                    }
                }
            });
        });
    }

    // Handle when have any change in CKEditor contents
    onChange(evt) { }

    // Handle when click on button submit to post article
    submitArticle() {
        console.log( $('#vi-title').val() );
        // An News article will have all below props, if want to add new props, please add it to 'news-frame.class'
        var news: News = {
            name: $('#vi-title').val(),
            slug: $('#news-link').val(),
            tags: $('#tags').val(),
            contents: this.model.editorDataVi,
            japanese_name: $('#jp-title').val(),
            japanese_contents: this.model.editorDataJp,
            status: "Pending"
        };

        // An Introduc article will have all below props, if want to add new props, please add it to 'introduces-frame.class'
        var introduce: Introduces = {
            name: $('#vi-title').val(),
            slug: $('#news-link').val(),
            contents: this.model.editorDataVi,
            japanese_name: $('#jp-title').val(),
            japanese_contents: this.model.editorDataJp,
            status: "Pending"
        };

        // Set Content-Type for POST Request
        var headers = new HttpHeaders().set('Content-Type','application/json');

        // Check whether categories is chosen
        if (this.categoriesDropdown !== null) {
            if (this.categoriesDropdown === "Tin tức & Sự kiện") {
                this.http.post(this.newsURL, JSON.stringify(news), {headers:headers}).subscribe(data => {
                    $('.message-popup').css('display','block');
                    setTimeout(function() {
                        $('.message-popup').hide();
                    }, 3000);
                });
            } else if (this.categoriesDropdown === "Giới thiệu") {
                this.http.post(this.introduceURL, JSON.stringify(introduce), {headers:headers}).subscribe(data => {
                    $('.message-popup').css('display','block');
                    setTimeout(function() {
                        $('.message-popup').hide();
                    }, 3000);
                });
                console.log(JSON.stringify(introduce));
            } 
        } else {
            alert('Vui lòng chọn Danh mục');
        }
    }
}