import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyAppointmentScheduleComponent } from './staff-my-appointment-schedule.component';

describe('StaffMyAppointmentScheduleComponent', () => {
  let component: StaffMyAppointmentScheduleComponent;
  let fixture: ComponentFixture<StaffMyAppointmentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMyAppointmentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyAppointmentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
