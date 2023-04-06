import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioMembershipPlanComponent } from './studio-membership-plan.component';

describe('StudioMembershipPlanComponent', () => {
  let component: StudioMembershipPlanComponent;
  let fixture: ComponentFixture<StudioMembershipPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioMembershipPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioMembershipPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
