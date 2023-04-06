import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkshopDetailComponent } from './client-workshop-detail.component';

describe('ClientWorkshopDetailComponent', () => {
  let component: ClientWorkshopDetailComponent;
  let fixture: ComponentFixture<ClientWorkshopDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWorkshopDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWorkshopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
