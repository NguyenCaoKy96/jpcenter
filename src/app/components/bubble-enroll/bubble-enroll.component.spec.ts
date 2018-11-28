import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleEnrollComponent } from './bubble-enroll.component';

describe('BubbleEnrollComponent', () => {
  let component: BubbleEnrollComponent;
  let fixture: ComponentFixture<BubbleEnrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleEnrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
