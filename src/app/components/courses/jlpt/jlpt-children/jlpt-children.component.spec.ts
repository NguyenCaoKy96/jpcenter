import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptChildrenComponent } from './jlpt-children.component';

describe('JlptChildrenComponent', () => {
  let component: JlptChildrenComponent;
  let fixture: ComponentFixture<JlptChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
