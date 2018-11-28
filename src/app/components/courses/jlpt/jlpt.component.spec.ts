import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptComponent } from './jlpt.component';

describe('JlptComponent', () => {
  let component: JlptComponent;
  let fixture: ComponentFixture<JlptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JlptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
