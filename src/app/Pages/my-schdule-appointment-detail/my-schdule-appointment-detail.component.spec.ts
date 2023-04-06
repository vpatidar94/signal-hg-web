import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySchduleAppointmentDetailComponent } from './my-schdule-appointment-detail.component';

describe('MySchduleAppointmentDetailComponent', () => {
  let component: MySchduleAppointmentDetailComponent;
  let fixture: ComponentFixture<MySchduleAppointmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySchduleAppointmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySchduleAppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
