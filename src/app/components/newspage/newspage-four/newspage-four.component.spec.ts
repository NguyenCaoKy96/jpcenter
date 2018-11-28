import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageFourComponent } from './newspage-four.component';

describe('NewspageFourComponent', () => {
  let component: NewspageFourComponent;
  let fixture: ComponentFixture<NewspageFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
