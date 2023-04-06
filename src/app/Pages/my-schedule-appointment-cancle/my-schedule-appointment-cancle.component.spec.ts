import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScheduleAppointmentCancleComponent } from './my-schedule-appointment-cancle.component';

describe('MyScheduleAppointmentCancleComponent', () => {
  let component: MyScheduleAppointmentCancleComponent;
  let fixture: ComponentFixture<MyScheduleAppointmentCancleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScheduleAppointmentCancleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScheduleAppointmentCancleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
