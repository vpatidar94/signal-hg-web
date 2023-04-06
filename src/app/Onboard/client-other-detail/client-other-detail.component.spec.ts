import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOtherDetailComponent } from './client-other-detail.component';

describe('ClientOtherDetailComponent', () => {
  let component: ClientOtherDetailComponent;
  let fixture: ComponentFixture<ClientOtherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOtherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOtherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
