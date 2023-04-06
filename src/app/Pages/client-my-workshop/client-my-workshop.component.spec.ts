import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyWorkshopComponent } from './client-my-workshop.component';

describe('ClientMyWorkshopComponent', () => {
  let component: ClientMyWorkshopComponent;
  let fixture: ComponentFixture<ClientMyWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMyWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
