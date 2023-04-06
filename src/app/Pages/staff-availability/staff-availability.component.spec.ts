import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAvailabilityComponent } from './staff-availability.component';

describe('StaffAvailabilityComponent', () => {
  let component: StaffAvailabilityComponent;
  let fixture: ComponentFixture<StaffAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
