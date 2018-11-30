import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import axios from 'axios';

// Language
import { default as LANG_VI } from '../../../lang/lang_vi';
import { default as LANG_JP } from '../../../lang/lang_jp';

@Component({
	selector: 'app-learn-register',
	templateUrl: './learn-register.component.html',
	styleUrls: ['./learn-register.component.css']
})
export class LearnRegisterComponent implements OnInit {
	public frmUser: FormGroup;
	public name;
	public email;
	public phone;
	public course;
	public notes;
	public LANGUAGE: any = LANG_VI;

	constructor(
		private _route: ActivatedRoute
	) { }

	ngOnInit() {
		// Change language
		this._route.queryParams.subscribe(data => {
			if (data.lang === 'vi') {
				this.LANGUAGE = LANG_VI;
			} else {
				this.LANGUAGE = LANG_JP;
			}
		});

		$(function ($) {
			var validation_holder;
			$("form#register_form input[name='submit']").click(function () {
				var validation_holder = 0;
				var name = $("#name").val();
				var name_regex = /^[\]\\[0-9][(){}/|''=^$*+?.!@#%^&,;:_-]/;
				var email = $("#email").val();
				var email_regex = /^[\w%_\-.\d]+@[\w.\-]+.[A-Za-z]{2,6}$/;
				var phone = $("#phone").val();
				var phone_regex = /^[0-9]{10,15}$/;
				var course = $("#course").val();
				var notes = $("#notes").val();

				if (name == "") {
					$("span.val_fname").html(`${this.LANGUAGE.MESSAGE_EMPTY_NAME}`).addClass('validate');
					validation_holder = 1;
				} else {
					if (name_regex.test(name)) {
						// If name in invalid
						$("span.val_fname").html(`${this.LANGUAGE.MESSAGE_INVALID_NAME}`).addClass('validate');
						validation_holder = 1;
					} else {
						$("span.val_fname").html("");
					}
				}
				if (email == "") {
					$("span.val_email").html(`${this.LANGUAGE.MESSAGE_EMPTY_EMAIL}`).addClass('validate');
					validation_holder = 1;
				} else {
					if (!email_regex.test(email)) {
						// If email is invalid
						$("span.val_email").html(`${this.LANGUAGE.MESSAGE_INVALID_EMAIL}`).addClass('validate');
						validation_holder = 1;
					} else {
						$("span.val_email").html("");
					}
				}
				if (phone == "") {
					$("span.val_phone").html(`${this.LANGUAGE.MESSAGE_EMPTY_PHONE_NUMBER}`).addClass('validate');
					validation_holder = 1;
				} else {
					if (!phone_regex.test(phone)) {
						// If phone number is invalid
						$("span.val_phone").html(`${this.LANGUAGE.MESSAGE_INVALID_PHONE_NUMBER}`).addClass('validate');
						validation_holder = 1;

					} else {
						$("span.val_phone").html("");
					}
				}
				if (course == "") {
					$("span.val_course").html(`${this.LANGUAGE.MESSAGE_EMPTY_COURSE}`).addClass('validate');
					validation_holder = 1;
				} else {
					$("span.val_course").html("");
				}

				if (validation_holder == 1) {
					// If have a field is blank, return false
					$("p.validate_msg").slideDown();
					return false;
					validation_holder = 0;
				} else {
					// $.post('http://10.1.0.66:1337/registers', {
					// 	Fullname: name,
					// 	Email: email,
					// 	Phone: phone,
					// 	Course: course,
					// 	Notes: notes

					// }, function(data) {

					// alert("Bạn đã đăng ký thành công..!.");

					// window.location.reload();
					// });

				}

			});

		});

	}

}

