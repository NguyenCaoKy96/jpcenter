import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
	private URL: string;
	private protocol: string;
	private serverDomain: string;
	private port: number;
	constructor() {
		this.protocol = 'http';
		this.serverDomain = '10.1.0.66';
		this.port = 1336;
	}

	// Server URL
	get serverURL() {
		this.URL = this.protocol + '://' + this.serverDomain + ':' + this.port;
		return this.URL;
	}

	// Header URL
	getHeaderURL(): string {
		let headerURL = this.serverURL + '/headers';
		return headerURL;
	}

	// Footer URL
	getContactURL(): string {
		let footerURL = this.serverURL + '/contacts';
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
		let contentsURL = this.serverURL + '/contents';
		return contentsURL;
	}

	// Content item URL
	getIntroducesItemURL(id): string {
		let contentItemURL = this.serverURL + '/contents/' + id;
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
		let newsURL = this.serverURL + '/news' + id;
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
		let imagesURL = this.serverURL + '/sliders';
		return imagesURL;
	}

	// Opening schedule URL
	getOpeningScheduleURL(): string {
		let openingURL = this.serverURL + '/openings';
		return openingURL;
	}
	//Categories
	getCategoriesURL(): string {
		let CategoriesURL = this.serverURL + '/categories';
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

	getclassesItemURL(id) : string {
		let classItem = this.serverURL + '/students/' + id;
		return classItem;
	}

	// Enroll list
	getEnrollListURL() {
		let enrollListURL = this.serverURL + '/registers';
		return enrollListURL;
	}

	// Get academics
	getAcademicsURL(): string {
		let academicsURL = this.serverURL + '/academics';
		return academicsURL;
	}

	// Get academics item
	getAcademicsItemURL(id): string {
		let academicsURL = this.serverURL + '/academics/' + id;
		return academicsURL;
	}

	// Get personel information
	getpersonnelURL(): string {
		let personnelURL = this.serverURL + '/personnels';
		return personnelURL;
	}

	// Get partner information
	getPartnerURL(): string {
		let partnersURL = this.serverURL + '/partners';
		return partnersURL;
	}

	// Get partner information
	getAdvertURL(): string {
		let advertURL = this.serverURL + '/advertisements';
		return advertURL;
	}

	// Get Content
	getContentURL(): string {
		let contentURL = this.serverURL + '/contents';
		return contentURL;
	}

	// Get Course
	getCourseURL(): string {
		let CoursesURL = this.serverURL + '/courses';
		return CoursesURL;
	}
	// Get Course
	getCourseItemURL(id): string {
		let CoursesItemURL = this.serverURL + '/courses/'+ id;
		return CoursesItemURL;
	}
	// Get Skill Course
	getSkillURL(): string {
		let SkillURL = this.serverURL + '/categories/5bffd84ca929700548a09664';
		return SkillURL;
	}
	// Get children Course
	getschildrenURL(): string{
		let childrenURL = this.serverURL + '/categories/5bffd84ca929700548a09664';
		return childrenURL;
	}
}