import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchengine2Component } from './searchengine2.component';

describe('Searchengine2Component', () => {
  let component: Searchengine2Component;
  let fixture: ComponentFixture<Searchengine2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Searchengine2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Searchengine2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
