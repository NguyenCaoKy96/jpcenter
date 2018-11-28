import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptChildrenN42Component } from './jlpt-children-n42.component';

describe('JlptChildrenN42Component', () => {
  let component: JlptChildrenN42Component;
  let fixture: ComponentFixture<JlptChildrenN42Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptChildrenN42Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptChildrenN42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
