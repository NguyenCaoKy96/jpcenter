import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageNineComponent } from './newspage-nine.component';

describe('NewspageNineComponent', () => {
  let component: NewspageNineComponent;
  let fixture: ComponentFixture<NewspageNineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
