import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClassesDetailComponent } from './client-classes-detail.component';

describe('ClientClassesDetailComponent', () => {
  let component: ClientClassesDetailComponent;
  let fixture: ComponentFixture<ClientClassesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientClassesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
