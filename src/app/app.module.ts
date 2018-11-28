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
import { NewService } from './components/news/service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// News Component
import { NewspageOneComponent } from './components/newspage/newspage-one/newspage-one.component';
import { NewspageTwoComponent } from './components/newspage/newspage-two/newspage-two.component';
import { NewspageThreeComponent } from './components/newspage/newspage-three/newspage-three.component';
import { NewspageFourComponent } from './components/newspage/newspage-four/newspage-four.component';
import { NewspageFiveComponent } from './components/newspage/newspage-five/newspage-five.component';
import { NewspageSixComponent } from './components/newspage/newspage-six/newspage-six.component';
import { NewspageSevenComponent } from './components/newspage/newspage-seven/newspage-seven.component';
import { NewspageEightComponent } from './components/newspage/newspage-eight/newspage-eight.component';
import { BannerComponent } from './components/banner/banner.component';
import { LinkComponent } from './components/link/link.component';
import { LoginComponent } from './components/header/login/login.component';
import { LogoutComponent } from './components/header/logout/logout.component';
import { UserComponent } from './components/student/user/user.component';
import { LearnRegisterComponent } from './components/learn-register/learn-register.component';

// Pagination
import {NgxPaginationModule } from 'ngx-pagination';

import { ClassManagementComponent } from './components/class-management/class-management.component';


import { EngineerComponent } from './components/news/news/engineer/engineer/engineer.component';
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
import { EnrollListPageComponent } from './components/enroll-list-page/enroll-list-page.component';import { AcademicComponent } from './components/academic/academic.component';
import { ExamPointComponent } from './components/academic/exam-point/exam-point.component';
import { CalendarComponent } from './components/academic/calendar/calendar.component';
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
  // {
  //   path :'quan-ly-lop-hoc',
  //   component: ClassManagementComponent,
  // },
  // {
  //   path :'danh-sach-dang-ky',
  //   component: EnrollListPageComponent,
  // },
  {
      path: '',
      component: HomeComponent
   },
  {
      path: 'trang-chu',
      component: HomeComponent,
   },
  {
    path: 'gioi-thieu',
    component: IntroductionComponent,
    children: [
      {
        path: '',
        component: IntroductionOneComponent
      },
      {
        path: 'trung-tam-nhat-ban',
        component: IntroductionOneComponent
      },
      {
        path: 'truong-dai-hoc-quy-nhon',
          component: IntroductionTwoComponent
      },
      {
        path: 'quy-nhon-binh-dinh',
          component: IntroductionThreeComponent
      },
      {
        path: 'nhan-su-trung-tam',
        component: IntroductionFourComponent
      },
      {
        path: 'tai-sao-chon-qnu-japan-center',
        component: IntroductionFiveComponent
      }
    ]
  },
  {
    path: 'gioi-thieu',
    component: IntroductionComponent,
    children: [
      {
        path: '',
        component: IntroductionOneComponent
      },
      {
        path: '日本センター',
        component: IntroductionOneComponent
      },
      {
        path: 'クイニョン大学',
          component: IntroductionTwoComponent
      },
      {
        path: 'quy-nhon-binh-dinh',
          component: IntroductionThreeComponent
      },
      {
        path: 'センターのスタッフ',
        component: IntroductionFourComponent
      },
      {
        path: 'QNUジャパンセンターを選ぶ理由',
        component: IntroductionFiveComponent
      }
    ]
  },
  {
    path: 'dich-vu-doi-tac',
    component: ServicePartnerComponent,
    children: [
      {
        path: '',
        component: StudyComponent
      },
      {
        path: 'tu-van-va-viec-lam',
        component: StudyComponent
      },
      {
        path: 'xuat-khau-lao-dong',
        component: LaborComponent
      },
      {
        path: 'du-an',
        component: ProjectsComponent
      },
      {
        path: 'doi-tac',
        component: PartnerComponent
      }
    ]
  },
  {
    path: 'chuong-trinh-ky-su-cau-noi',
    component: EngineerComponent,
  },
  {
    path: 'khoa-hoc',
    component: CoursesComponent,
    children: [
      {
        path: '',
        component: JlptComponent,
      },
      {
        path: 'cac-khoa-tieng-nhat-JLPT',
        component: JlptComponent,
      },
      {
        path: 'tieng-nhat-cho-thieu-nhi',
        component: ChildrenComponent
      },
      {
        path: 'cac-khoa-ky-nang-mem',
        component: SkillsComponent
      }
    ]
  },
  {
    path: 'tai-sao-chon-QNU-Japan-Center',
    component: WhyChooseJpcenterComponent
  },
  
  {
    path: 'tin-tuc-su-kien',
    component: NewspageComponent
  },
   {
    path: 'co-hoi-nghe-nghiep',
    component: CareerOpportunitiesComponent,
    children: [
      {
        path: '',
        component: JapanCenterComponent
      },
      {
        path: 'trung-tam-nhat-ban',
        component: JapanCenterComponent
      },
      {
        path: 'doanh-nghiep',
        component: EnterpriseComponent
      }
    ]
  },
  {
    path: 'tin-tuc-su-kien/QNU-JAPAN-CENTER-Dang-ky-hoc-vien',
    component: NewspageOneComponent
  },
  {
    path: 'tin-tuc-su-kien/dinh-huong-nghe-nghiep-va-co-hoi-viec-lam-voi-TMA-solutions',
    component: NewspageTwoComponent
  },
  {
    path: 'tin-tuc-su-kien/bup-be-thang-nam-samurai',
    component: NewspageThreeComponent
  },
  {
    path: 'tin-tuc-su-kien/ngai-dai-su-nhat-ban-umeda-kunio-du-khai-truong',
    component: NewspageFourComponent
  },
  {
  path: 'tin-tuc-va-su-kien/hieu-truong-dh-quy-nhon-tham-du-hoi-nghi-xuc-tien-dau-tu-binh-dinh-tai-nhat-ban',
    component: NewspageFiveComponent
  },
  {
    path: 'tin-tuc-va-su-kien/truong-dh-quy-nhon-dong-hanh-cung-tinh-binh-dinh-trong-thu-hut-dau-tu-nhat-ban',
    component: NewspageSixComponent
  },
  {
    path: 'tin-tuc-va-su-kien/anh-dao-no-vuon-haiku',
    component: NewspageSevenComponent
  },
   {
    path: 'tin-tuc-va-su-kien/xuan-sang-khong-chi-co-hoa-anh-dao',
    component: NewspageEightComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    children: [

    ]
  },
  {
    path :'viet-bai',
    component: SupporterPageComponent
  },
  {
    path :'quan-ly-lop-hoc',
    component: ClassManagementComponent,
  },
  {
    path :'danh-sach-dang-ky',
    component: EnrollListPageComponent,
  },
  {
    path: 'dang-ky-hoc',
    component: BubbleEnrollComponent
  },
  {
    path: 'hoc-vu',
    component: AcademicComponent
  },
   {
    path: 'hoc-vu/lich-hoc',
    component: CalendarComponent
  },
  
    {
    path: 'hoc-vu/diem-thi',
    component: ExamPointComponent
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
    NewspageOneComponent,
    NewspageTwoComponent,
	  NewspageThreeComponent,
    NewspageFourComponent,
    NewspageFiveComponent,
    NewspageSixComponent,
    NewspageSevenComponent,
    NewspageEightComponent,
    BannerComponent, 
    LinkComponent,
    LoginComponent, 
    LogoutComponent,
    LearnRegisterComponent, 
    UserComponent,
    EngineerComponent,
    BubbleEnrollComponent,
ClassManagementComponent,
    EnrollListPageComponent,AcademicComponent,
    ExamPointComponent,
    CalendarComponent,
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