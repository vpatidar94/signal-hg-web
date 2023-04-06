import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNutritionDetailComponent } from './my-nutrition-detail.component';

describe('MyNutritionDetailComponent', () => {
  let component: MyNutritionDetailComponent;
  let fixture: ComponentFixture<MyNutritionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNutritionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNutritionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
