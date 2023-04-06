import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyAppointmentComponent } from './staff-my-appointment.component';

describe('StaffMyAppointmentComponent', () => {
  let component: StaffMyAppointmentComponent;
  let fixture: ComponentFixture<StaffMyAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMyAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
