import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../models/entity/flight';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-flightinfoquote',
  templateUrl: './flightinfoquote.component.html',
  styleUrls: ['./flightinfoquote.component.css']
})
export class FlightinfoquoteComponent implements OnInit {
  @Input() flight: Flight;
  price: number;
  panelOpenState = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  selectFlight(p: Flight): void {
    const div = document.getElementById('A-' + p.id);
    const child = div.children[0] as HTMLElement;
    child.style.setProperty('background-color', '#CBEDE3');
    this.togglePanel();
    this.dataService.selectedFlight.push(p);
    console.log(this.dataService.selectedFlight);
  }

  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

}

