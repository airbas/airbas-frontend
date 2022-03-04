import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  passengers: any[];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.passengers = Array(this.dataService.passengerForFlight).fill(0).map((x, i) => i);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
