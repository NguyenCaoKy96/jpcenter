import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageSevenComponent } from './newspage-seven.component';

describe('NewspageSevenComponent', () => {
  let component: NewspageSevenComponent;
  let fixture: ComponentFixture<NewspageSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
