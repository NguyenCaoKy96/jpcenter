import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChooseJpcenterComponent } from './why-choose-jpcenter.component';

describe('WhyChooseJpcenterComponent', () => {
  let component: WhyChooseJpcenterComponent;
  let fixture: ComponentFixture<WhyChooseJpcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyChooseJpcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyChooseJpcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
