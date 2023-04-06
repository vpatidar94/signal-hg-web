import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffClassesDetailComponent } from './staff-classes-detail.component';

describe('StaffClassesDetailComponent', () => {
  let component: StaffClassesDetailComponent;
  let fixture: ComponentFixture<StaffClassesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffClassesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
