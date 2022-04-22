import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {ProfileService} from '../services/profile.service';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';
import {ReservationService} from '../services/reservation.service';
import {Reservation} from '../models/entity/reservation';
import {Profile} from '../models/entity/profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name = '';
  cognome = '';
  creditcard = '';
  email = '';
  telephone = '';
  editable = true;

  constructor(public dataService: DataService,
              public dialog: MatDialog,
              public profileService: ProfileService,
              public reservationService: ReservationService,
              public router: Router) { }

  activateEdit() {
    this.editable = false;
  }

  confirmData() {
    this.editable = true;
    if (this.creditcard !== '' && this.email !== '' && this.telephone) {
      const payload = new Profile();
      payload.creditcard = this.creditcard;
      payload.email = this.email;
      payload.telephone = this.telephone;
      this.profileService.updateProfile(payload).subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.openDialogStep('E\' successo un\'imprevisto');
        }
      );
    } else {
      this.openDialogStep('I campi utenti non devono essere vuoti');
    }
    // Send request to server
  }

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
    if (mail === undefined || mail === '')   {
      this.router.navigate(['/error']);
    } else {
      this.profileService.details(mail).subscribe(
        res => {
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
          this.dataService.reservations = res;
          // this.reservations = res;
        },
        err => {
          this.openDialogStep('E\' successo un\'imprevisto');
        }
      );
    }
  }

}
