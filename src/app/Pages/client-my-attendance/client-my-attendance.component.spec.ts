import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyAttendanceComponent } from './client-my-attendance.component';

describe('ClientMyAttendanceComponent', () => {
  let component: ClientMyAttendanceComponent;
  let fixture: ComponentFixture<ClientMyAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMyAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
