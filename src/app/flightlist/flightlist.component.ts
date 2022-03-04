import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {Flight} from '../models/entity/flight';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.css']
})
export class FlightlistComponent implements OnInit {

  source: string;
  destination: string;
  price: number;
  listFlightTo: Flight[];
  listFlightFrom: Flight[];
  passengers: any[];


  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.price = 120;
    this.source = this.dataService.sourceCity;
    this.destination = this.dataService.destCity;
    if (this.dataService.typeFlight === 'ONE WAY') {
      this.listFlightTo = this.fillHour(this.dataService.oneWayData);
    } else {
      this.listFlightTo = this.fillHour(this.dataService.fullTripData[0]);
      this.listFlightFrom = this.fillHour(this.dataService.fullTripData[1]);
    }
    this.passengers = Array(this.dataService.passengerForFlight).fill(0).map((x, i) => i);

  }

  fillHour(listFlight: Flight[]): Flight[] {
    // tslint:disable-next-line:forin
    for (const f in listFlight) {
      const isoDateDep = listFlight[f].departureDate;
      listFlight[f].depHours = isoDateDep.match(/\d\d:\d\d/)[0];
      const isoDateArr = listFlight[f].arrivalDate;
      listFlight[f].arrHours = isoDateArr.match(/\d\d:\d\d/)[0];
    }
    return listFlight;
  }
}
