import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyPurchaseComponent } from './client-my-purchase.component';

describe('ClientMyPurchaseComponent', () => {
  let component: ClientMyPurchaseComponent;
  let fixture: ComponentFixture<ClientMyPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMyPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
