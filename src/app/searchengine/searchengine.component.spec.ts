import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchengineComponent } from './searchengine.component';

describe('SearchengineComponent', () => {
  let component: SearchengineComponent;
  let fixture: ComponentFixture<SearchengineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchengineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
