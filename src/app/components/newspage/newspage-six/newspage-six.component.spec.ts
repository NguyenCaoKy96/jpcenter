import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspageSixComponent } from './newspage-six.component';

describe('NewspageSixComponent', () => {
  let component: NewspageSixComponent;
  let fixture: ComponentFixture<NewspageSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspageSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspageSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
