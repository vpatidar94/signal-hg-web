import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScheduleAppointmantComponent } from './my-schedule-appointmant.component';

describe('MyScheduleAppointmantComponent', () => {
  let component: MyScheduleAppointmantComponent;
  let fixture: ComponentFixture<MyScheduleAppointmantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScheduleAppointmantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScheduleAppointmantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
