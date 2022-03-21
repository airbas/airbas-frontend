import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightoffersComponent } from './flightoffers.component';

describe('FlightoffersComponent', () => {
  let component: FlightoffersComponent;
  let fixture: ComponentFixture<FlightoffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightoffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
