import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Profile} from '../models/entity/profile';
import {ProfileService} from '../services/profile.service';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';
import {ReservationService} from '../services/reservation.service';
import {Flight} from '../models/entity/flight';
import {Reservation} from '../models/entity/reservation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  reservations: Reservation[];
  name = '';
  cognome = '';
  creditcard = '';
  email = '';
  telephone = '';

  constructor(public dataService: DataService,
              public dialog: MatDialog,
              public profileService: ProfileService,
              public reservationService: ReservationService) { }

  openDialogStep(msg: string) {
    this.dialog.open(DialogloginComponent, {
      data: {
        type: 'Attenzione',
        error: 'Dati mancanti',
        message: msg
      }
    });
  }

  ngOnInit(): void {
    const mail = this.dataService.userLoggedName;
    this.profileService.details(mail).subscribe(
      res => {
        console.log(res);
        this.name = res.firstname;
        this.cognome = res.secondname;
        this.creditcard = res.creditcard;
        this.email = res.email;

      },
      err => {
        // this.openDialogStep('E\' successo un\'imprevisto');
      }
    );
    this.reservationService.get(mail).subscribe(
      res => {
        this.reservations = res;
        console.log(res);
        console.log(this.reservations);
      },
      err => {
        // this.openDialogStep('E\' successo un\'imprevisto');
      }
    );
  }

}
