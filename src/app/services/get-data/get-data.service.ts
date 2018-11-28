import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

	public serverURL: string;

	constructor() {
		this.serverURL = 'http://10.1.0.66:1337';
	}

	// Header URL
	getHeaderURL(): string {
		let headerURL = this.serverURL + '/headers';
		return headerURL;
	}

	// Footer URL
	getFooterURL(): string {
		let footerURL = this.serverURL + '/footers';
		return footerURL;
	}

	// Courses URL
	getCoursesURL(): string {
		let coursesURL = this.serverURL + '/courses';
		return coursesURL;
	}

	// Students URL
	getStudentsURL(): string {
		let studentsURL = this.serverURL + '/students';
		return studentsURL;
	}

	// Teachers URL
	getTeachersURL(): string {
		let teachersURL = this.serverURL + '/teachers';
		return teachersURL;
	}

	// Users URL
	getUsersURL(): string {
		let usersURL = this.serverURL + '/users';
		return usersURL;
	}

	// Contents URL
	getIntroducesURL(): string {
		let contentsURL = this.serverURL + '/introduces';
		return contentsURL;
	}

	// Content item URL
	getIntroducesItemURL(id): string {
		let contentItemURL = this.serverURL + '/introduces/' + id;
		return contentItemURL;
	}

	// Events URL
	getEventsURL(): string {
		let eventsURL = this.serverURL + '/events';
		return eventsURL;
	}
	// News URL
	getNewsURL(): string {
		let newsURL = this.serverURL + '/news';
		return newsURL;
	}
	// News URL
	getNewsItemURL(id): string {
		let newsURL = this.serverURL + '/news' +id;
		return newsURL;
	}

	// Classes URL
	getClassesURL(): string {
		let classesURL = this.serverURL + '/classes';
		return classesURL;
	}

	// Attendances URL
	getAttendancesURL(): string {
		let attendancesURL = this.serverURL + '/attendances';
		return attendancesURL;
	}

	// Logo URL
	getLogoURL(): string {
		let logosURL = this.serverURL + '/logos';
		return logosURL;
	}

	// Images URL
	getImagesURL(): string {
		let imagesURL = this.serverURL + '/images';
		return imagesURL;
	}

	// Opening schedule URL
	getOpeningScheduleURL(): string {
		let openingURL = this.serverURL + '/openings';
		return openingURL;
	}
	//Categories
	getCategoriesURL(): string {
		let CategoriesURL = this.serverURL + '/Categories';
		return CategoriesURL;
	}
	//Categorie item
	getCategoriesItemURL(id): string {
		let CategoriesURL = this.serverURL + '/Categories/' + id;
		return CategoriesURL;
	}
	// jobs URl
	getJobsURL(): string {
		let jobsURL = this.serverURL + '/jobs';
		return jobsURL;
	}
	//jobs id
	getJobsItemURL(id): string {
		let JobsURL = this.serverURL + '/jobs/' + id;
		return JobsURL;
	}
	getServicesURL() : string {
		let servicesURL = this.serverURL + '/services';
		return servicesURL;
	}
	// Service id
	getServicesItemURL(id): string {
		let ServicesURL = this.serverURL + '/services/' + id;
		return ServicesURL;
	}
	// jlpt URL
	getjlptURL() : string {
		let jlptURL = this.serverURL + '/jlpts';
		return jlptURL;
	}
	// jlpt id
	getjlptItemURL(id) : string {
		let jlptItemURL = this.serverURL + '/jlpts/' + id;
		return jlptItemURL;
	}
	// skill URL
	getskillsURL() : string {
		let skillURL = this.serverURL + '/skills';
		return skillURL;
	}
	// children URL
	getschildrenURL() : string {
		let childrenURL = this.serverURL + '/childrens';
		return childrenURL;
	}

	//Partners URL
	getpartnerURL() : string {
		let partnerURL = this.serverURL + '/partners';
		return partnerURL;
	}

	getclassesItemURL(id) : string {
		let classItem = this.serverURL + '/classes/' + id;
		return classItem;
	}

	// Enroll list
	getEnrollListURL() {
		let enrollListURL = this.serverURL + '/registers';
		return enrollListURL;
	}getAcademicsURL(): string {
		let academicsURL = this.serverURL + '/academics';
		return academicsURL;
	}
}