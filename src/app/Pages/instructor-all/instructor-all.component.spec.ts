import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAllComponent } from './instructor-all.component';

describe('InstructorAllComponent', () => {
  let component: InstructorAllComponent;
  let fixture: ComponentFixture<InstructorAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
