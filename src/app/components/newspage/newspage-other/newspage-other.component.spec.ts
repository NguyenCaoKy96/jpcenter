import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageOtherComponent } from './newspage-other.component';

describe('NewspageOneComponent', () => {
  let component: NewspageOtherComponent;
  let fixture: ComponentFixture<NewspageOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
