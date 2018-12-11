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
		this.serverDomain = '103.199.7.56';
		this.port = 1336;
	}

	// Server URL
	get serverURL() {
		this.URL = this.protocol + '://' + this.serverDomain + ':' + this.port;
		return this.URL;
	}
// Header URL
	getLoginURL(): string {
	let loginURL = this.serverURL + '/auth/local';
	return loginURL;
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

	// Content URL
	// getContentsURL() : string{
	// 	let contentsURL
	// }

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
	// Events item URL
	getEventsItemURL(id): string {
		let eventsURL = this.serverURL + '/events/' + id ;
		return eventsURL;
	}

	// News URL
	getNewsURL(): string {
		let newsURL = this.serverURL + '/news';
		return newsURL;
	}
	// News URL
	getNewsItemURL(id): string {
		let newsURL = this.serverURL + '/news/' + id;
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
	// getjlptURL() : string {
	// 	let jlptURL = this.serverURL + '/jlpts';
	// 	return jlptURL;
	// }
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

	// Get advert information
	getAdvertURL(): string {
		let advertURL = this.serverURL + '/advertisements';
		return advertURL;
	}

	// Get Content
	getContentURL(): string {
		let contentURL = this.serverURL + '/contents';
		return contentURL;
	}

	// Get Enterprise
	getEnterpriseURL(): string {
		let enterpriseURL = this.serverURL + '/categories/5bffd8b8a929700548a0967b';
		return enterpriseURL;
	}

	// Get Japan_Center_Opportunities
	getJapanOpportunityURL(): string {
		let japanOpportunityURL = this.serverURL + '/categories/5bffd8aba929700548a0967a';
		return japanOpportunityURL;
	}

	// Get Labor 
	getLaborURL(): string {
		let laborURL = this.serverURL + '/categories/5bffd872a929700548a09677';
		return laborURL;
	}

	// Get Partner
	getPartnerServiceURL(): string {
		let partnerServiceURL = this.serverURL + '/categories/5c0125bb5d3d34177327e4c5';
		return partnerServiceURL;
	}

	// Get Project 
	getProjectURL(): string {
		let projectURL = this.serverURL + '/categories/5bffd881a929700548a09678';
		return projectURL;
	}

	// Get Study_Service 
	getStudyURL(): string {
		let studyURL = this.serverURL + '/categories/5bffd860a929700548a09665';
		return studyURL;
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
	getschildrenURL(): string {
		let childrenURL = this.serverURL + '/categories/5bffd838a929700548a09663';
		return childrenURL;
	}
	// Get jlpt Course
	getjlptURL(): string {
		let JlptURl = this.serverURL + '/categories/5bffd822a929700548a09662';
		return JlptURl;
	}

	// Get new Why QNU of home page
	getNewWhyQnuURL(): string {
		let newWhyQnuURL = this.serverURL + '/categories/5bffd812a929700548a0965e';
		return newWhyQnuURL;
	}

	// Get new Project of home page
	getNewProjectURL(): string {
	let newProjectURL = this.serverURL + '/categories/5c0117f05d3d34177327e4bd';
	return newProjectURL;
	}

	// Get new introduction of home page
	getNewIntroducURL(): string {
		let newJobIntroducURL = this.serverURL + '/categories/5bffd7c2a929700548a09652';
		return newJobIntroducURL;
	}

	// Get new Job opportunities of home page
	getNewJobURL(): string {
		let newJobURL = this.serverURL + '/categories/5c01189a5d3d34177327e4c0';
		return newJobURL;
	}
// Get new QNU Japan Center of home page
	getNewQnuJapanURL(): string {
		let newQnuJapanURL = this.serverURL + '/news/5c06363d1d16be73a7d5dd3f';
		return newQnuJapanURL;
	}

	// Get new Doll Samurai of home page
	getNewDollURL(): string {
		let newDollURL = this.serverURL + '/news/5c0635e31d16be73a7d5dd3b';
		return newDollURL;
	}

	// Get new The Ambassador of Japan of homne page
	getNewAmbassURL(): string {
		let newAmbassURL = this.serverURL + '/news/5c0634b01d16be73a7d5dd38';
		return newAmbassURL;
	}// get new Mark
	getMarkURL(): string {
		let newMarkURL = this.serverURL + '/marks';
		return newMarkURL;
	}	
    getOrientationURL(): string {
		let orientationURL= this.serverURL + '/news/5bffdf68fb17a7056f156f37';
		return orientationURL;
	}
}