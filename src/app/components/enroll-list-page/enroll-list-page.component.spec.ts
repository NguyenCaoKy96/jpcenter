import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollListPageComponent } from './enroll-list-page.component';

describe('EnrollListPageComponent', () => {
  let component: EnrollListPageComponent;
  let fixture: ComponentFixture<EnrollListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
