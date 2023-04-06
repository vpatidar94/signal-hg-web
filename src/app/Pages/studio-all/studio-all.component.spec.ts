import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioAllComponent } from './studio-all.component';

describe('StudioAllComponent', () => {
  let component: StudioAllComponent;
  let fixture: ComponentFixture<StudioAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
