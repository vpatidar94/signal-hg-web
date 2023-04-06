import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientForgotComponent } from './client-forgot.component';

describe('ClientForgotComponent', () => {
  let component: ClientForgotComponent;
  let fixture: ComponentFixture<ClientForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
