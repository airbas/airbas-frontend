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
  panelOpenState = false;
  error = false;
  warning = false;


  constructor(public dataService: DataService) { }

  ngOnInit(): void {

  }


  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

  checkSeat(): void {
    let countSeat = 0;
    const seats = [];
    const div = document.getElementById(this.flightt.name);
    // const arr = div.getElementsByClassName('seat')
    const arr = Array.from(div.getElementsByClassName('seat') as HTMLCollectionOf<HTMLElement>);

    console.log(arr);
    // const childs = div.children;
    // console.log(childs);
    // const arr = Array.from(document.getElementsByClassName('seat') as HTMLCollectionOf<HTMLElement>);
    // console.log(arr.length);
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
        countSeat += 1;
      }
    }
    if (countSeat > this.dataService.passengerForFlight) {
      this.error = true;
      this.warning = false;
    } else if (countSeat === this.dataService.passengerForFlight) {
      console.log('OK seat');
      this.error = false;
      this.warning = false;
      this.dataService.seatList = seats;
      this.togglePanel();
    } else if (countSeat < this.dataService.passengerForFlight) {
      this.error = false;
      this.warning = true;
    }

    const flights = this.dataService.selectedFlight;
    for (const f of flights) {
      if (f.name === this.flightt.name) {
        f.seat = seats;
      }
    }
    this.dataService.selectedFlight = flights;
  }

}
