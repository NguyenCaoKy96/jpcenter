import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageEightComponent } from './newspage-eight.component';

describe('NewspageEightComponent', () => {
  let component: NewspageEightComponent;
  let fixture: ComponentFixture<NewspageEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
