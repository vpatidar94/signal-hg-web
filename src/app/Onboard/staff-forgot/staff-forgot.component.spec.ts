import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffForgotComponent } from './staff-forgot.component';

describe('StaffForgotComponent', () => {
  let component: StaffForgotComponent;
  let fixture: ComponentFixture<StaffForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
