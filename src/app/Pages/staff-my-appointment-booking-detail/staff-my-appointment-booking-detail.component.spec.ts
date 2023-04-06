import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyAppointmentBookingDetailComponent } from './staff-my-appointment-booking-detail.component';

describe('StaffMyAppointmentBookingDetailComponent', () => {
  let component: StaffMyAppointmentBookingDetailComponent;
  let fixture: ComponentFixture<StaffMyAppointmentBookingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMyAppointmentBookingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyAppointmentBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
