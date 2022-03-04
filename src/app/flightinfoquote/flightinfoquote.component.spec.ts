import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightinfoquoteComponent } from './flightinfoquote.component';

describe('FlightinfoquoteComponent', () => {
  let component: FlightinfoquoteComponent;
  let fixture: ComponentFixture<FlightinfoquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightinfoquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightinfoquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
