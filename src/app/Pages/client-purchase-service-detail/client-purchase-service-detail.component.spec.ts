import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPurchaseServiceDetailComponent } from './client-purchase-service-detail.component';

describe('ClientPurchaseServiceDetailComponent', () => {
  let component: ClientPurchaseServiceDetailComponent;
  let fixture: ComponentFixture<ClientPurchaseServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPurchaseServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPurchaseServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
