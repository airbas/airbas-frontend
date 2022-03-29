import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';
import {Passenger} from '../models/entity/passenger';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  phone = new FormControl('', [Validators.required]);
  nome = '';
  cognome = '';
  date;
  passengers: any[];
  clicked = false;

  constructor(public dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.passengers = Array(this.dataService.passengerForFlight).fill(0).map((x, i) => i);
  }

  getErrorMessage() {
    if (this.phone.hasError('required')) {
      return 'You must enter a value';
    }

    return this.phone.hasError('phone') ? 'Not a valid phone' : '';
  }

  openDialog() {
    this.dialog.open(DialogloginComponent, {data : { type: 'Attenzione',
        error: 'Dati mancanti',
        message: 'Alcuni campi dei passeggeri non sono rimepiti correttamente!'}});
  }

  confirmData() {
    const p = new Passenger();
    if (this.date !== '' && this.nome !== '' && this.cognome !== '' && this.phone.value !== '') {
      p.date = this.date;
      p.name = this.nome;
      p.cognome = this.cognome;
      p.phone = this.phone.value;
      this.dataService.passengers.push(p);
      this.clicked = true;
    } else {
      this.openDialog();
    }
  }
}
