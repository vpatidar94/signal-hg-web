import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScheduleDetailComponent } from './my-schedule-detail.component';

describe('MyScheduleDetailComponent', () => {
  let component: MyScheduleDetailComponent;
  let fixture: ComponentFixture<MyScheduleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScheduleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
