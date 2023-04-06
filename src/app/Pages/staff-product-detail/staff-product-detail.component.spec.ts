import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductDetailComponent } from './staff-product-detail.component';

describe('StaffProductDetailComponent', () => {
  let component: StaffProductDetailComponent;
  let fixture: ComponentFixture<StaffProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
