import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptChildrenN52Component } from './jlpt-children-n52.component';

describe('JlptChildrenN52Component', () => {
  let component: JlptChildrenN52Component;
  let fixture: ComponentFixture<JlptChildrenN52Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptChildrenN52Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptChildrenN52Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
