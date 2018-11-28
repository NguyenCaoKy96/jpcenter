import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptChildrenN31Component } from './jlpt-children-n31.component';

describe('JlptChildrenN31Component', () => {
  let component: JlptChildrenN31Component;
  let fixture: ComponentFixture<JlptChildrenN31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptChildrenN31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptChildrenN31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
