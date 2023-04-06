import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffClassesComponent } from './staff-classes.component';

describe('StaffClassesComponent', () => {
  let component: StaffClassesComponent;
  let fixture: ComponentFixture<StaffClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
