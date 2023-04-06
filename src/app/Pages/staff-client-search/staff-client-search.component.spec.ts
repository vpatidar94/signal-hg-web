import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffClientSearchComponent } from './staff-client-search.component';

describe('StaffClientSearchComponent', () => {
  let component: StaffClientSearchComponent;
  let fixture: ComponentFixture<StaffClientSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffClientSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
