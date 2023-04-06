import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClassesComponent } from './client-classes.component';

describe('ClientClassesComponent', () => {
  let component: ClientClassesComponent;
  let fixture: ComponentFixture<ClientClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
