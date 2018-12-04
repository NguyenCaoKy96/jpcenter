import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { GetDataService } from './../../services/get-data/get-data.service';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import axios from 'axios';
import { News } from './news-frame.class';
import { Introduces } from './introduces-frame.class';
import { academics } from './academics-frame.class';

import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
    selector: 'app-supporter-page',
    templateUrl: './supporter-page.component.html',
    styleUrls: ['./supporter-page.component.css'],
    providers: [GetDataService]
})

export class SupporterPageComponent implements OnInit {
    // Config for CKEditor
    public Editor = ClassicEditor;
    public isDisabled = false;
    public config = {
        cloudServices: {
            tokenUrl: 'https://35921.cke-cs.com/token/dev/M3oF3XeTQf4XeRCcLaIxJtYOZXe2Hk3fmAxTmKtdMssXjFl1mfpl2nmRnzXw',
            uploadUrl: 'https://35921.cke-cs.com/easyimage/upload/'
        },
        disallowedContent : 'img{width,height}'
    };
    public model = {
        editorDataVi: '',
        editorDataJp: ''
    };

    // Valid form 
    public frmSuporter: FormGroup;
    public headerData: any;
    public headerSubCategories: any;
    public categoriesDropdown: any;
    public subCategoriesDropDown: any[];
    public subCategories: any;
    public tempData: any;
    public tempDataOnPost: any;
    public categoriesSlug: any;
    public newsURL: string;
    public introduceURL: string;
    public academicsURL: string;
    public academics: any;
    public openingSchedule: any;
    public openingURL: string;
    public LANGUAGE: any = LANG_VI;
    public courseURL: string;

    private _isValid = true;

    constructor(
        private http: HttpClient,
        private _getDataService: GetDataService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute
    ) { }

    // Detect value of "categories" dropdown when change its value
    detectCategoriesValue() { }

    ngOnInit() {
        // Change language
        this._route.queryParams.subscribe(data => {
            if (data.lang === 'vi') {
                this.LANGUAGE = LANG_VI;
            } else {
                this.LANGUAGE = LANG_JP;
            }
        });
        this.courseURL = this._getDataService.getCoursesURL()
        this.newsURL = this._getDataService.getNewsURL();
        this.introduceURL = this._getDataService.getIntroducesURL();
        this.academicsURL = this._getDataService.getAcademicsURL();
        this.openingURL = this._getDataService.getOpeningScheduleURL();

        // this.http.get(this._getDataService.getHeaderURL())
        // .subscribe(data => {
        //     this.headerData = data;
        // });

        // Get sub-categories of each categories when choose a categories
        // $('#categories').on("change", () => {
        //     this.categoriesDropdown = $('#categories').val();
        //     this.http.get(this._getDataService.getHeaderURL())
        //     .subscribe(data => {
        //         this.tempData = data;
        //         for (var i=0; i<this.tempData.length; i++) {
        //             if (this.tempData[i].Name === this.categoriesDropdown) {
        //                 this.subCategoriesDropDown = this.tempData[i].categories;
        //             }
        //         }
        //     });
        // });
        this.createForm();
    }
    // Valid form with Regex
    createForm() {
        this.frmSuporter = this._formBuilder.group({
            title: ['', [
                Validators.pattern('^[A-Za-z0-9.,!?"":;-_#%&*()ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+$'),
                Validators.required
            ]],
            title1: ['', [
                Validators.pattern('^[A-Za-z0-9.,!?"":;-_#%&*()ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+$'),
                Validators.required
            ]],
            title2: ['', [
                Validators.pattern('^[A-Za-z0-9.,!?"":;-_#%&*()ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+$'),
                Validators.required
            ]],
            viContent: ['', [
                Validators.required
            ]],
            jpContent: ['', [
                Validators.required
            ]],
            fileLink: ['', [
            ]]
        });
    }

    // Handle when have any change in CKEditor contents
    onChange(evt) { }

    // Handle when click on button submit to post article
    submitArticle() {
        // An academics article will have all below props, if want to add new props, please add it to 'academics-frame.class'
        var academics: academics = {
            Name: $('#vi-title').val(),
            Link: $('slug').val(),
            Contents: this.model.editorDataVi,
            Status: "Pending"
        }
    }

    onSubmitForm() {
        this.categoriesDropdown = $('#categories').val();
        // Set Content-Type for Submit action
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        // An News article will have all below props, if want to add new props, please add it to 'news-frame.class'
        if (this.frmSuporter.value.title.length > 255 || this.frmSuporter.value.title2 > 255 
            || this.frmSuporter.value.title1.length > 255 || this.frmSuporter.value.fileLink > 255
        ) {
            this._isValid = false;
        } else {
            this._isValid = true;
        }
        var news: News = {
            Name: this.frmSuporter.value.title,
            Slug: this.frmSuporter.value.title2,
            Content: this.model.editorDataVi,
            Japanese_Name: this.frmSuporter.value.title1,
            Japanese_Content: this.model.editorDataJp,
            Time: '',
            Location: '',
            Object: '',
            Program: '',
            JapaneseTime: '',
            JapaneseLocation: '',
            JapaneseObject: '',
            JapaneseProgram: '',
            File: this.frmSuporter.value.fileLink,
            categories: {
                "Name": '',
                "Slug": '',
                "Japanese_Name": '',
                "Image": '',
                "courses": '',
                "news": '',
            },
            Status: "Pending"
        };

        // Check whether content is invalid or epmty
        if (news.Name === '' || news.Japanese_Name === '' 
            || news.Content === '' || news.Japanese_Content === '' 
            || news.Slug === '' || !this.categoriesDropdown
            || this._isValid === false
        ) {
            $('.message-fail').css('display', 'block');
            setTimeout(function () {
                $('.message-fail').hide();
            }, 3000);
        }
        else {
            if (this.categoriesDropdown === this.LANGUAGE.NEWS_AND_EVENTS) {
                this.http.post(this.newsURL, JSON.stringify(news), { headers: headers }).subscribe(data => {
                    console.log(data);
                });
                $('.message-success').css('display', 'block');
                    setTimeout(function () {
                        $('.message-success').hide();
                    }, 3000);
            }
            else {
                if (this.categoriesDropdown === this.LANGUAGE.JAPAN_CENTER) {
                    this.http.post(this.courseURL, JSON.stringify(news), { headers: headers }).subscribe(data => {
                        console.log(data);
                    });
                    $('.message-success').css('display', 'block');
                        setTimeout(function () {
                            $('.message-success').hide();
                        }, 3000);
                }
            }
        }
       
        
    }
}