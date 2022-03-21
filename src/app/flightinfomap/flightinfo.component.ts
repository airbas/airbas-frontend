import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../models/entity/flight';
import {DataService} from '../services/data.service';
import {SearchFlightService} from '../services/search-flight.service';


@Component({
  selector: 'app-flightinfo',
  templateUrl: './flightinfo.component.html',
  styleUrls: ['./flightinfo.component.css']
})
export class FlightinfoComponent implements OnInit {
  @Input() flightt: Flight;
  price: number;
  seat: any;
  panelOpenState = false;

  constructor(public dataService: DataService,
              public flightService: SearchFlightService) { }

  ngOnInit(): void {

  }


  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

  selectSeat(flightt: Flight) {
    const flights = this.dataService.selectedFlight;
    for (const f of flights) {
      if (f.name === flightt.name) {
        f.seat = this.seat;
      }
    }
    this.togglePanel();
  }
}
