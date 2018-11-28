import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPointComponent } from './exam-point.component';

describe('ExamPointComponent', () => {
  let component: ExamPointComponent;
  let fixture: ComponentFixture<ExamPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
