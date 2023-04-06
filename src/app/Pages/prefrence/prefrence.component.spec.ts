import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefrenceComponent } from './prefrence.component';

describe('PrefrenceComponent', () => {
  let component: PrefrenceComponent;
  let fixture: ComponentFixture<PrefrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
