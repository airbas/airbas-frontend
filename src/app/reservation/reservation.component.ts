import { Component, Input, OnInit } from '@angular/core';
import {Reservation} from '../models/entity/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  customDate: string;
  depHours: string;
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
    this.customDate = this.reservation.date.split('T')[0];
    this.depHours = this.reservation.date.match(/\d\d:\d\d/)[0];
  }

  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

  removeReservation(r: Reservation): void {
    console.log(r);
    this.togglePanel();
    // COde to remove reservation backend
  }

}
