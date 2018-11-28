import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptChildrenN32Component } from './jlpt-children-n32.component';

describe('JlptChildrenN32Component', () => {
  let component: JlptChildrenN32Component;
  let fixture: ComponentFixture<JlptChildrenN32Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptChildrenN32Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptChildrenN32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
