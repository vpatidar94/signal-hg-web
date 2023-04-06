import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyAppointmentPaymentComponent } from './staff-my-appointment-payment.component';

describe('StaffMyAppointmentPaymentComponent', () => {
  let component: StaffMyAppointmentPaymentComponent;
  let fixture: ComponentFixture<StaffMyAppointmentPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMyAppointmentPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyAppointmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
