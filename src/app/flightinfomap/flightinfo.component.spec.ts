import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightinfoComponent } from './flightinfo.component';

describe('FlightinfoComponent', () => {
  let component: FlightinfoComponent;
  let fixture: ComponentFixture<FlightinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
