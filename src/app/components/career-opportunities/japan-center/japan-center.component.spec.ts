import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JapanCenterComponent } from './japan-center.component';

describe('JapanCenterComponent', () => {
  let component: JapanCenterComponent;
  let fixture: ComponentFixture<JapanCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JapanCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JapanCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
