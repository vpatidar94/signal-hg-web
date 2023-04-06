import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyAppointmentBookingComponent } from './staff-my-appointment-booking.component';

describe('StaffMyAppointmentBookingComponent', () => {
  let component: StaffMyAppointmentBookingComponent;
  let fixture: ComponentFixture<StaffMyAppointmentBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMyAppointmentBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyAppointmentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
