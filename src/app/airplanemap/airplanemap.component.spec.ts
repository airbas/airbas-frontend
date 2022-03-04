import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanemapComponent } from './airplanemap.component';

describe('AirplanemapComponent', () => {
  let component: AirplanemapComponent;
  let fixture: ComponentFixture<AirplanemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirplanemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
