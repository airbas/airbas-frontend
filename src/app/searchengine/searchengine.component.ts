import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import {SearchFlightReq} from '../models/request/search-flight-req';
import { SearchFlightService} from '../services/search-flight.service';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-searchengine',
  templateUrl: './searchengine.component.html',
  styleUrls: ['./searchengine.component.css']
})


export class SearchengineComponent implements OnInit {
  formSearchEngine: FormGroup;
  selectTrip = 'FULL_TRIP';
  message = '';

  constructor( private searchFlightService: SearchFlightService,
               private router: Router,
               public dataService: DataService,
               public dialog: MatDialog) {

    this.formSearchEngine = new FormGroup({
      departureCity: new FormControl(''),
      arrivalCity : new FormControl(),
      onlyDepartureDate : new FormControl(),
      dateGroup: new FormGroup({
        departureDate: new FormControl(),
        returnDate: new FormControl()
      }),
      passengers : new FormControl(),
    });
  }

  ngOnInit() {
    this.dataService.passengerForFlight = 0;
    this.dataService.selectedFlight = [];
    this.dataService.passengers = [];
  }

  checkEmptyValue(): boolean {
    if (this.selectTrip === 'FULL_TRIP') {

      if (this.formSearchEngine.get('departureCity').value
        && this.formSearchEngine.get('arrivalCity').value
        && this.formSearchEngine.get('passengers').value
       && this.formSearchEngine.controls.dateGroup.value) {
        if (this.formSearchEngine.get('passengers').value > 0) {
          return true;
        }
        this.message = 'I passaggeri devono avere un valore almeno pari ad 1';
        return false;
      }
      this.message = 'Controlla di aver inserito un valore corretto per ogni campo!';
      return false;
    } else {
      if (this.formSearchEngine.get('departureCity').value
        && this.formSearchEngine.get('arrivalCity').value
        && this.formSearchEngine.get('passengers').value
        && this.formSearchEngine.get('onlyDepartureDate').value) {
        if (this.formSearchEngine.get('passengers').value > 0) {
          return true;
          this.message = 'I passaggeri devono avere un valore almeno pari ad 1';
        }
        this.message = 'Controlla di aver inserito un valore corretto per ogni campo!';
        return false;
      }
    }
    return false;
  }

  onSubmit(): void {
    if (this.checkEmptyValue()) {
      const request = new SearchFlightReq( this.formSearchEngine.get('departureCity').value,
        this.formSearchEngine.get('arrivalCity').value,
        this.formSearchEngine.get('passengers').value
      );
      this.dataService.destCity = this.formSearchEngine.get('arrivalCity').value;
      this.dataService.sourceCity = this.formSearchEngine.get('departureCity').value;
      this.dataService.passengerForFlight = this.formSearchEngine.get('passengers').value;
      if (this.selectTrip === 'ONE_WAY') {
        request.setDepartureDate(this.formSearchEngine.get('onlyDepartureDate').value.toISOString());

        this.searchFlightService.searchOneWay(request).subscribe(
          res => {
            // console.log(res);
            this.dataService.oneWayData = res;
            this.router.navigate(['/flights'] );
          },
          err => {
            console.log(err);
          }
        );
      } else if (this.selectTrip === 'FULL_TRIP') {
        request.setDepartureDate(this.formSearchEngine.controls.dateGroup.value.departureDate.toISOString());
        request.setReturnDate(this.formSearchEngine.controls.dateGroup.value.returnDate.toISOString());

        this.searchFlightService.searchFullTrip(request).subscribe(
          res => {
            this.dataService.fullTripData = res;
            this.router.navigate(['/flights']);
          },
          err => {
            console.log(err);
          }
        );
      }
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    console.log('errrorrr');
    this.dialog.open(DialogloginComponent, {data : { type: 'Errore',
        error: 'Dati errati',
        message: this.message}});
  }

}
