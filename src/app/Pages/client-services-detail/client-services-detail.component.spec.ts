import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServicesDetailComponent } from './client-services-detail.component';

describe('ClientServicesDetailComponent', () => {
  let component: ClientServicesDetailComponent;
  let fixture: ComponentFixture<ClientServicesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientServicesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientServicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
