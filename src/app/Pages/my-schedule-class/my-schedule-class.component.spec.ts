import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScheduleClassComponent } from './my-schedule-class.component';

describe('MyScheduleClassComponent', () => {
  let component: MyScheduleClassComponent;
  let fixture: ComponentFixture<MyScheduleClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScheduleClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScheduleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
