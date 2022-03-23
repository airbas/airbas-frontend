import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {MatDialog} from '@angular/material/dialog';
import {Flight} from '../models/entity/flight';

@Component({
  selector: 'app-airplanemap',
  templateUrl: './airplanemap.component.html',
  styleUrls: ['./airplanemap.component.css']
})
export class AirplanemapComponent implements OnInit {
  error = false;
  warning = false;
  panelOpenState = false;

  @Input() flight: Flight;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {

  }

  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

  checkSeat(): void {
    let countSeat = 0;
    const seats = [];
    const arr = Array.from(document.getElementsByClassName('seat') as HTMLCollectionOf<HTMLElement>);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      // tslint:disable-next-line:no-shadowed-variable
      const label = arr[i].children[1];
      // tslint:disable-next-line:no-shadowed-variable
      const compStyles = window.getComputedStyle(label);
      // tslint:disable-next-line:no-shadowed-variable
      const colorBck = compStyles.getPropertyValue('background-color');
      // tslint:disable-next-line:triple-equals
      if (colorBck == 'rgb(186, 218, 85)') {
        seats.push(arr[i].innerText);
        console.log(arr[i].innerText);
        countSeat += 1;
      }
      if (countSeat > this.dataService.passengerForFlight) {
        this.error = true;
        this.warning = false;

      } else if (countSeat === this.dataService.passengerForFlight) {
        this.error = false;
        this.warning = false;
        this.dataService.seatList = seats;
      } else {
        this.error = false;
        this.warning = true;
      }
    }

    const flights = this.dataService.selectedFlight;
    for (const f of flights) {
      if (f.name === this.flight.name) {
        f.seat = seats;
      }
    }
    this.dataService.selectedFlight = flights;
  }

}

