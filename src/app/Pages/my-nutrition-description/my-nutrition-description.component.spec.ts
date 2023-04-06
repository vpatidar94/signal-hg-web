import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNutritionDescriptionComponent } from './my-nutrition-description.component';

describe('MyNutritionDescriptionComponent', () => {
  let component: MyNutritionDescriptionComponent;
  let fixture: ComponentFixture<MyNutritionDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNutritionDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNutritionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
