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

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  selectFlight(p: Flight): void {
    const div = document.getElementById('A-' + p.id);
    const child = div.children[0] as HTMLElement;
    child.style.setProperty('background-color', '#03bb85');
    this.dataService.selectedFlight.push(p);
  }

}
