import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import * as $ from 'jquery';
import axios from 'axios';
@Component({
  selector: 'app-learn-register',
  templateUrl: './learn-register.component.html',
  styleUrls: ['./learn-register.component.css']
})
export class LearnRegisterComponent implements OnInit {
	public frmUser: FormGroup;
name;
email;
phone;
course;
notes;

  constructor() { }

  ngOnInit() {
  	 $(function($){
  	 	var validation_holder;
  	 	$("form#register_form input[name='submit']").click(function() {
  	 		var validation_holder = 0;
  	 		var name = $("#name").val();
  	 		var name_regex = /^[\]\\[0-9][(){}/|''=^$*+?.!@#%^&,;:_-]/;
  	 		var email = $("#email").val();
  	    	var email_regex = /^[\w%_\-.\d]+@[\w.\-]+.[A-Za-z]{2,6}$/; 
  	    	var phone = $("#phone").val();	
  	    	var phone_regex	= /^[0-9]{10,15}$/;
  	    	var course = $("#course").val();
  	    	var notes = $("#notes").val();

  	    		if(name == "") {
					$("span.val_fname").html("Hãy nhập họ và tên!!.").addClass('validate');
					validation_holder = 1;
				} else {	
				if(name_regex.test(name)){ // Nếu tên không hợp lệ
					$("span.val_fname").html("Họ và tên không hợp lệ!!.").addClass('validate');
					validation_holder = 1;	
				} else {
					$("span.val_fname").html("");
					}
				}
				if(email == "") {
					$("span.val_email").html("Hãy nhập email!!.").addClass('validate');
					validation_holder = 1;
				} else {
				if(!email_regex.test(email)){ // Nếu email không hợp lệ
					$("span.val_email").html("Email không hợp lệ!!.").addClass('validate');
					validation_holder = 1;
				} else {
					$("span.val_email").html("");
					}
				}
				if(phone == "") {
					$("span.val_phone").html("Hãy nhập số điện thoại!!.").addClass('validate');
					validation_holder = 1;
				} else {
				if(!phone_regex.test(phone)){ // Nếu Số điện thoại không hợp lệ
					$("span.val_phone").html("Số điện thoại không hợp lệ!!.").addClass('validate');
					validation_holder = 1;
			
				} else {
					$("span.val_phone").html("");
					}
				}
				if(course == "") {
					$("span.val_course").html("Hãy nhập khóa học!!.").addClass('validate');
					validation_holder = 1;
				} else {
					$("span.val_course").html("");
				}

				if(validation_holder == 1) { // if have a field is blank, return false
					$("p.validate_msg").slideDown();
						return false;
				  validation_holder = 0; // else return true

			} else{
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

