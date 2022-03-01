import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SearchFlightReq} from '../models/request/search-flight-req';
import { SearchFlightService} from '../services/search-flight.service';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-searchengine2',
  templateUrl: './searchengine2.component.html',
  styleUrls: ['./searchengine2.component.css']
})


export class Searchengine2Component implements OnInit {
  formSearchEngine: FormGroup;
  selectTrip: string;

  constructor( private searchFlightService: SearchFlightService,
               private router: Router,
               public dataService: DataService) {
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

  ngOnInit(): void {
  }

  onSubmit(): void {
    const request = new SearchFlightReq( this.formSearchEngine.get('departureCity').value,
                                        this.formSearchEngine.get('arrivalCity').value,
                                        this.formSearchEngine.get('passengers').value
      );
    if (this.selectTrip === 'ONE_WAY') {
      request.setDepartureDate(this.formSearchEngine.get('onlyDepartureDate').value.toISOString());

      this.searchFlightService.searchOneWay(request).subscribe(
        res => {
          // console.log(res);
          this.dataService.serviceData = res;
          this.router.navigate(['/flights'] );
        },
        err => {
          console.log(err);
        }
      );
    } else if (this.selectTrip === 'FULL_TRIP') {
      request.setDepartureDate(this.formSearchEngine.controls.dateGroup.value.departureDate.toISOString());
      request.setReturnDate(this.formSearchEngine.controls.dateGroup.value.returnDate.toISOString());
      console.log(request);

      this.searchFlightService.searchFullTrip(request).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
        }
      );
    }

  }

}
