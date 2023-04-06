import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedDetailsComponent } from './news-feed-details.component';

describe('NewsFeedDetailsComponent', () => {
  let component: NewsFeedDetailsComponent;
  let fixture: ComponentFixture<NewsFeedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
