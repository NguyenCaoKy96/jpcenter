import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageOneComponent } from './newspage-one.component';

describe('NewspageOneComponent', () => {
  let component: NewspageOneComponent;
  let fixture: ComponentFixture<NewspageOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
