import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// Service
import { GetDataService } from './../../services/get-data/get-data.service';

@Component({
  selector: 'app-opening-schedule',
  templateUrl: './opening-schedule.component.html',
  styleUrls: ['./opening-schedule.component.css'],
  providers: [ GetDataService ]
})

export class OpeningScheduleComponent implements OnInit {
	public page='one';
	openingSchedule: any;
	openingURL: string;

	constructor(
		private _titleService: Title,
		private _http: HttpClient,
		private _getDataService: GetDataService
	) { }

	ngOnInit() {
		this._titleService.setTitle('Lịch khai giảng');
		this.openingURL = this._getDataService.getOpeningScheduleURL();
		this.getSchedule();
	}

	getSchedule() {
		let data;
		this._http.get(this.openingURL).subscribe(data => {
			this.openingSchedule = data;
			console.log(this.openingSchedule);
		});
	}

}
