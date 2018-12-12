// Modules
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


// App components
import { AppComponent } from './app.component';
//Admin-dashboard
import { SupporterPageComponent } from './components/supporter-page/supporter-page.component'

// Header component
import { HeaderComponent } from './components/header/header.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';

// Slider component
import { SlideComponent } from './components/slide//slide.component';

// Footer component
import { FooterComponent } from './components/footer/footer.component';

// Home component
import { HomeComponent } from './components/home/home.component';

// Students page component
import { StudentComponent } from './components/student/student.component';
import { CourseComponent } from './components/student/course/course.component';
import { ScheduleComponent } from './components/student/schedule/schedule.component';
import { ResultComponent } from './components/student/result/result.component';
import { RegisterComponent } from './components/student/register/register.component';

// Introduction component
import { IntroductionComponent } from './components/introduction/introduction.component';
import { IntroductionOneComponent } from './components/introduction/components/introduction-one/introduction-one.component';
import { IntroductionTwoComponent } from './components/introduction/components/introduction-two/introduction-two.component';
import { IntroductionThreeComponent } from './components/introduction/components/introduction-three/introduction-three.component';
import { IntroductionFourComponent } from './components/introduction/components/introduction-four/introduction-four.component';
import { IntroductionFiveComponent } from './components/introduction/components/introduction-five/introduction-five.component';

// News component
import { NewspageComponent } from './components/newspage/newspage.component';
import { NewsComponent } from './components/news/news/news.component';

// Courses page component
import { CoursesComponent } from './components/courses/courses.component';
import { SkillsComponent } from './components/courses/skills/skills.component';
import { JlptComponent } from './components/courses/jlpt/jlpt.component';
import { ChildrenComponent } from './components/courses/children/children.component';

// Breadcrum component
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

// Events component
import { EventComponent } from './components/news/event/event.component';

// Career - Oppotunities component
import { CareerOpportunitiesComponent } from './components/career-opportunities/career-opportunities.component';
import { JapanCenterComponent } from './components/career-opportunities/japan-center/japan-center.component';
import { EnterpriseComponent } from './components/career-opportunities/enterprise/enterprise.component';

// Opening schedule component
import { OpeningScheduleComponent } from './components/opening-schedule/opening-schedule.component';

// Why choose Quy Nhon University component
import { WhyChooseJpcenterComponent } from './components/why-choose-jpcenter/why-choose-jpcenter.component';

// Service - Partner component
import { ServicePartnerComponent } from './components/service-partner/service-partner.component';
import { StudyComponent } from './components/service-partner/study/study.component';
import { LaborComponent } from './components/service-partner/labor/labor.component';
import { ProjectsComponent } from './components/service-partner/projects/projects.component';
import { PartnerComponent } from './components/service-partner/partner/partner.component';

// HTTP services
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Routes
import { RouterModule, Router, Routes, NavigationEnd } from '@angular/router';

// Custom Services
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// News Component

import { BannerComponent } from './components/banner/banner.component';
import { LinkComponent } from './components/link/link.component';
import { LoginComponent } from './components/header/login/login.component';
import { LogoutComponent } from './components/header/logout/logout.component';
import { UserComponent } from './components/student/user/user.component';
import { LearnRegisterComponent } from './components/learn-register/learn-register.component';

// Pagination
import {NgxPaginationModule } from 'ngx-pagination';


import { OwlModule } from 'ngx-owl-carousel';
import { NgxCarouselModule } from 'ngx-carousel';
// Hammer.js lib
import 'hammerjs';

// Drag and Drop
import { BubbleEnrollComponent } from './components/bubble-enroll/bubble-enroll.component';
import { ReactiveFormsModule } from '@angular/forms';


// Angular Material Tooltips
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EnrollListPageComponent } from './components/enroll-list-page/enroll-list-page.component';
import { AcademicComponent } from './components/academic/academic.component';
import { ExamPointComponent } from './components/academic/exam-point/exam-point.component';
import { CalendarComponent } from './components/academic/calendar/calendar.component';
import { ExamCalendarComponent } from './components/academic/exam-calendar/exam-calendar.component';
import { ClassManagementComponent } from './components/class-management/class-management.component';
import { ManagePointComponent } from './components/manage-point/manage-point.component';
import { AboutLearnerComponent } from './components/about-learner/about-learner.component';

const routes: Routes = [
  {

    path: 'student',    
    component: StudentComponent,
    children:
      [
        {
          path: '',
          redirectTo: 'student/',
          pathMatch: 'full'
        },
        {
          path: 'course',
          component: CourseComponent
        },
        {
          path: 'result',
          component: ResultComponent
        },
        {
          path: 'schedule',
          component: ScheduleComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'user',
          component: UserComponent
        }
      ]
  },
  {
    path: 'gioi-thieu',
    component: IntroductionComponent
  },
  {
    path: 'gioi-thieu/:id',
    component: IntroductionComponent
  },
  {
    path: 'gioi-thieu/日本センター',
    component: IntroductionComponent
  },
  
  {
    path :'viet-bai',
    component: SupporterPageComponent
  },
  {
      path: '',
      component: HomeComponent
   },
  {
      path: 'trang-chu',
      component: HomeComponent,
   },
  {
    path: 'dich-vu-doi-tac',
    component: ServicePartnerComponent,
  },
  // {
  //   path: 'khoa-hoc',
  //   component: JlptComponent,
  // },

  {
    path: 'khoa-hoc/cac-khoa-tieng-nhat-JLPT',
    component: JlptComponent,
  },
  {
    path: 'khoa-hoc/tieng-nhat-cho-thieu-nhi',
    component: ChildrenComponent
  },
  {
    path: 'khoa-hoc/cac-khoa-ky-nang-mem',
    component: SkillsComponent
  }, 
 
  {
    path: 'tai-sao-chon-QNU-Japan-Center',
    component: WhyChooseJpcenterComponent
  },
  {
    path: 'lich-khai-giang',
    component: OpeningScheduleComponent
  },
  {
    path: 'tin-tuc-su-kien',
    component: NewspageComponent
  },
  {
    path: 'trang-chu/tin-tuc-su-kien',
    component: NewspageComponent
  },
  {
    path: 'co-hoi-nghe-nghiep',
    component: CareerOpportunitiesComponent,
  },
  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    children: [
      {
        path :'viet-bai',
        component: SupporterPageComponent
      }
    ]
  },
  {
    path: 'dang-ky-hoc',
    component: BubbleEnrollComponent
  },
  {
    path: 'quan-ly-lop-hoc',
    component:ClassManagementComponent
  },
  {
    path: 'danh-sach-dang-ky',
    component:EnrollListPageComponent
  },
  {
    path: 'hoc-vu',
    component: AcademicComponent,
    children:[
      {
        path: '',
        component: CalendarComponent
      },
       {
        path: 'lich-hoc',
          component: CalendarComponent
      },
      {
        path: 'lich-thi',
        component: ExamCalendarComponent
      },
         
        {
        path: 'diem-thi',
          component: ExamPointComponent
      },
    ]
  },
  {
    path: 'quan-ly-diem',
    component: ManagePointComponent
  },

];

const childRoutes: Routes = [
  
];

@NgModule({
  declarations: [
    SupporterPageComponent,
    AppComponent,
    FooterComponent,
    StudentComponent,
    HeaderComponent,
    CourseComponent,
    ScheduleComponent,
    ResultComponent,
    RegisterComponent,
    NewsComponent,
    EventComponent,
	  SlideComponent,
    SubMenuComponent,
    IntroductionComponent,
    IntroductionOneComponent,
    IntroductionTwoComponent,
    IntroductionThreeComponent,
    IntroductionFourComponent,
    IntroductionFiveComponent,
    NewspageComponent,
    HomeComponent,
    CoursesComponent,
    CareerOpportunitiesComponent,
    ServicePartnerComponent,
    OpeningScheduleComponent,
    JapanCenterComponent,
    EnterpriseComponent,
    BreadcrumbsComponent,
    SkillsComponent,
    JlptComponent,
    ChildrenComponent,
    WhyChooseJpcenterComponent,
    StudyComponent,
    LaborComponent,
    ProjectsComponent,
    PartnerComponent,
    BannerComponent, 
    LinkComponent,
    LoginComponent, 
    LogoutComponent,
    LearnRegisterComponent, 
    UserComponent,
    BubbleEnrollComponent,
    EnrollListPageComponent,
    AcademicComponent,
    CalendarComponent,
    ExamCalendarComponent,
    ExamPointComponent,
    ClassManagementComponent,
    ManagePointComponent,
    AboutLearnerComponent,
  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    FormsModule, 
    RouterModule.forRoot(routes),
	  NgxPaginationModule,
    NgxCarouselModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    OwlModule
  ],

  providers: [],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }