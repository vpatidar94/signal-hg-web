import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCartComponent } from './staff-cart.component';

describe('StaffCartComponent', () => {
  let component: StaffCartComponent;
  let fixture: ComponentFixture<StaffCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
