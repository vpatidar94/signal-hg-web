import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyAppointmentCancleComponent } from './staff-my-appointment-cancle.component';

describe('StaffMyAppointmentCancleComponent', () => {
  let component: StaffMyAppointmentCancleComponent;
  let fixture: ComponentFixture<StaffMyAppointmentCancleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMyAppointmentCancleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyAppointmentCancleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
