import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../models/entity/flight';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-flightinfo',
  templateUrl: './flightinfo.component.html',
  styleUrls: ['./flightinfo.component.css']
})
export class FlightinfoComponent implements OnInit {
  @Input() flightt: Flight;
  price: number;
  seat: any;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  selectSeat(flightt: Flight) {
    const flights = this.dataService.selectedFlight;
    for (const f of flights) {
      if (f.name === flightt.name) {
        f.seat = this.seat;
      }
    }
  }
}
