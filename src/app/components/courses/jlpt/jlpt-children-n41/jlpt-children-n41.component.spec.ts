import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptChildrenN41Component } from './jlpt-children-n41.component';

describe('JlptChildrenN41Component', () => {
  let component: JlptChildrenN41Component;
  let fixture: ComponentFixture<JlptChildrenN41Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptChildrenN41Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptChildrenN41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
