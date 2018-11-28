import { Component, OnInit,Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';
import * as $ from 'jquery';
import axios from 'axios';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-bubble-enroll',
  templateUrl: './bubble-enroll.component.html',
  styleUrls: ['./bubble-enroll.component.css'],
  providers: [GetDataService]
})

export class BubbleEnrollComponent implements OnInit {
	public frmUser: FormGroup;
  registerURL:string;
  registerData;
  lang: string = 'vi';
  constructor(
      private http: HttpClient,
      private _getDataService: GetDataService,
      private route: ActivatedRoute,
  		private _formBuilder : FormBuilder
  ) {
      // Get data register page
      this.registerURL = this._getDataService.getjlptURL();
      this.http.get(this.registerURL).subscribe(data =>{
        this.registerData = data;
        console.log(data);
      });
  }
  ngOnInit() {
    // Get language
    this.route.queryParams.subscribe(data => {
    this.lang = data.lang;
  });

    // Post data register page
  	$(function($){
  		var validation_holder;
  		$("form#register_form button[name='submit']").click(function(){
  			var validation_holder = 0;
  			var name = $('#name').val();
  			var email = $("#email").val();
  			var phone = $("#phone").val();
  			var course = $("#course").val();
  			var notes = $("#notes").val();
  			if(validation_holder == 1) {
          // if have a field is blank, return false	
			    return;
			  } else {
  				$.post('http://10.1.0.66:1337/registers', {
  					Fullname: name,
  					Email: email,
  					Phone: phone,
  					Course: course,
  					Notes: notes
  			  }, function(data) {
  				alert("Bạn đã đăng ký thành công..!.");
  				  window.location.reload();
  				});
			  }
  		});
  	});
  	this.createForm();
  }

  // Trim space at the start and end position of name string
  onNameBlur() {
    let name = $('#name').val($('#name').val().trim());
    return name;
  }
  
  // Valid form with Regex
  createForm(){
    this.frmUser = this._formBuilder.group({
  		fullname: ['',[
  			Validators.required, 
        Validators.pattern('^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+$')
  		]],
  		email: ['',[
  			Validators.required,
  			Validators.pattern('[a-zA-Z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)*'),
  		]],
  		phone: ['',[
  			Validators.required,
  			Validators.pattern('(0)+([0-9]{9})'),
      ]],
  		course: ['' ,Validators.required],
  		notes: ['',]
  	});
  }
  
  /*
  *  Handler when submit form
  */
  onSubmitForm(){
  	console.log(this.frmUser.value);
	}
}