import { Component, Input, OnInit } from '@angular/core';
import {Reservation} from '../models/entity/reservation';
import {ReservationService} from '../services/reservation.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  passengerName: string;
  passengerSurname: string;
  customDate: string;
  depHours: string;
  panelOpenState = false;

  constructor(public reservationService: ReservationService,
              public dataService: DataService) { }

  ngOnInit(): void {
    this.customDate = this.reservation.date.split('T')[0];
    this.depHours = this.reservation.date.match(/\d\d:\d\d/)[0];
    const reservation = JSON.parse(JSON.stringify((this.reservation)));
    this.passengerName = reservation.passenger['firstname'];
    this.passengerSurname = reservation.passenger['secondname'];
  }

  togglePanel() {
    this.panelOpenState = this.panelOpenState ? false : true;
  }

  removeReservation(r: Reservation): void {
    console.log('Before delete');
    console.log(this.dataService.reservations);
    const nameres = r.name;
    this.reservationService.delete(this.dataService.userLoggedName, r.name).subscribe(
      res => {
        console.log('After delete');
        console.log(this.dataService.reservations);
        console.log('Name res to delete ' + nameres);
        console.log(document.getElementById(nameres));
        const elem = document.getElementById(nameres);
        elem.parentNode.removeChild(elem);
      },
      err => {}
    );
    this.togglePanel();
  }

}
