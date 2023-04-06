import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingMealComponent } from './tracking-meal.component';

describe('TrackingMealComponent', () => {
  let component: TrackingMealComponent;
  let fixture: ComponentFixture<TrackingMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
