import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePartnerComponent } from './service-partner.component';

describe('ServicePartnerComponent', () => {
  let component: ServicePartnerComponent;
  let fixture: ComponentFixture<ServicePartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
