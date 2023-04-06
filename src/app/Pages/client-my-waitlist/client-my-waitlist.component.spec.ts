import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyWaitlistComponent } from './client-my-waitlist.component';

describe('ClientMyWaitlistComponent', () => {
  let component: ClientMyWaitlistComponent;
  let fixture: ComponentFixture<ClientMyWaitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMyWaitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
