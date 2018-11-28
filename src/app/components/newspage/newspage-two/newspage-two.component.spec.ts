import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageTwoComponent } from './newspage-two.component';

describe('NewspageTwoComponent', () => {
  let component: NewspageTwoComponent;
  let fixture: ComponentFixture<NewspageTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
