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

  totPrice: number;
  panelOpenState = false;
  selected: string;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.totPrice = parseInt(this.flight.price, 10);
    this.selected = '0';
  }

  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

  selectFlight(p: Flight): void {
    const div = document.getElementById('A-' + p.id);
    const child = div.children[0] as HTMLElement;
    child.style.setProperty('background-color', '#CBEDE3');
    this.togglePanel();
    p.price = String(this.totPrice);
    p.rate = this.selected;
    this.dataService.selectedFlight.push(p);
  }

  removeFlight(flight: Flight) {
    const div = document.getElementById('A-' + flight.id);
    const child = div.children[0] as HTMLElement;
    child.style.setProperty('background-color', 'white');
    this.togglePanel();
    this.dataService.selectedFlight = this.dataService.selectedFlight.filter(obj => obj !== flight);
  }


  onChange() {
    // tslint:disable-next-line:triple-equals
    if (this.selected == '1') {
      this.totPrice = parseInt(this.flight.price, 10) + Number(30.99);
      // tslint:disable-next-line:triple-equals
    } else if (this.selected == '2') {
      this.totPrice = parseInt(this.flight.price, 10) + Number(80.99);
      // tslint:disable-next-line:triple-equals
    } else if (this.selected == '0') {
      this.totPrice = parseInt(this.flight.price, 10);
    }
  }
}

