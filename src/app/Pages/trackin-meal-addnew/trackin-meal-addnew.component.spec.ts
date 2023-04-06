import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackinMealAddnewComponent } from './trackin-meal-addnew.component';

describe('TrackinMealAddnewComponent', () => {
  let component: TrackinMealAddnewComponent;
  let fixture: ComponentFixture<TrackinMealAddnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackinMealAddnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackinMealAddnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
