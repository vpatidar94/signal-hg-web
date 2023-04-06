import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPurchaseServiceComponent } from './client-purchase-service.component';

describe('ClientPurchaseServiceComponent', () => {
  let component: ClientPurchaseServiceComponent;
  let fixture: ComponentFixture<ClientPurchaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPurchaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPurchaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
