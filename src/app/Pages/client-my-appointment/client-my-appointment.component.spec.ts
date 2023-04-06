import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyAppointmentComponent } from './client-my-appointment.component';

describe('ClientMyAppointmentComponent', () => {
  let component: ClientMyAppointmentComponent;
  let fixture: ComponentFixture<ClientMyAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMyAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
