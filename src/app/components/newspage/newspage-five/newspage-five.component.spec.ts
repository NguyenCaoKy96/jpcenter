import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageFiveComponent } from './newspage-five.component';

describe('NewspageFiveComponent', () => {
  let component: NewspageFiveComponent;
  let fixture: ComponentFixture<NewspageFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
