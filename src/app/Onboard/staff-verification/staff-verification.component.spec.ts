import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffVerificationComponent } from './staff-verification.component';

describe('StaffVerificationComponent', () => {
  let component: StaffVerificationComponent;
  let fixture: ComponentFixture<StaffVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
