import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageThreeComponent } from './newspage-three.component';

describe('NewspageThreeComponent', () => {
  let component: NewspageThreeComponent;
  let fixture: ComponentFixture<NewspageThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
