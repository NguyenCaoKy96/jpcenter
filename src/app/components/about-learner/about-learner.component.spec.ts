import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLearnerComponent } from './about-learner.component';

describe('AboutLearnerComponent', () => {
  let component: AboutLearnerComponent;
  let fixture: ComponentFixture<AboutLearnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutLearnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
