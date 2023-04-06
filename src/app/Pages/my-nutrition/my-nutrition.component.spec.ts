import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNutritionComponent } from './my-nutrition.component';

describe('MyNutritionComponent', () => {
  let component: MyNutritionComponent;
  let fixture: ComponentFixture<MyNutritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNutritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
