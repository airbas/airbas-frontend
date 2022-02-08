import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchResponse} from '../models/search-result';
import {BookingDetails} from '../models/booking-details';
import {FlightSearchService} from '../services/flight-search.service';
import {Flight} from '../models/flight';
import { map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-searchengine',
  templateUrl: './searchengine.component.html',
  styleUrls: ['./searchengine.component.css']
})
export class SearchengineComponent implements OnInit {
  @Output() searchResults = new EventEmitter<SearchResponse>();
  @Output() loadingComponent = new EventEmitter<boolean>();
  public bookingDetails: BookingDetails;
  public filteredOriginCities = [];
  public filteredDestinationCities = [];
  public citiesList = [];

  constructor(private flightService: FlightSearchService) {
    this.bookingDetails = {
      departure: '', arrival: '', departDate: new Date(''), returnDate: new Date(''), oneway: true, passengers: 1,
      refine: 5000
    };
  }

  ngOnInit() {
    this.flightService.getCityList().subscribe(cities => {
      this.citiesList = cities; console.log('city list', this.citiesList);
    });
  }

  changeBookingType(type: boolean) {
    this.bookingDetails.oneway = type;
  }

  onSubmit() {
    this.bookingDetails.arrival = this.bookingDetails.arrival.toLowerCase();
    this.bookingDetails.departure = this.bookingDetails.departure.toLowerCase();
    this.search(this.bookingDetails);
  }

  onSelectionChanged(city: string, isOrigin: boolean) {
    isOrigin ? this.bookingDetails.departure = city : this.bookingDetails.arrival = city;
    isOrigin ? this.filteredOriginCities = [] : this.filteredDestinationCities = [];
  }

  suggestCity(city: string, isOrigin: boolean) {
    city = city.toLowerCase(); // convert to lowercase
    isOrigin ? this.filteredOriginCities = [] : this.filteredDestinationCities = [];
    if (city) {
      this.citiesList.filter((item) => {
        if (item.includes(city)) {
          isOrigin ? this.filteredOriginCities.push(item) : this.filteredDestinationCities.push(item);
        }
      });
    }
  }

  search(searchParams: BookingDetails) {
    if (searchParams.oneway) {
      this.oneWayFlightSearch(searchParams);
    } else {
      this.twoWayFlightSearch(searchParams);
    }
  }

  private twoWayFlightSearch(searchParams: BookingDetails) {
    let oneWayFlights;
    this.performSearch(searchParams).subscribe(res => {
      oneWayFlights = res;
      if (oneWayFlights) {
        const returnSearchParams: BookingDetails = {
          departure: searchParams.departure,
          arrival: searchParams.arrival,
          departDate: searchParams.returnDate,
          refine: searchParams.refine,
          passengers: searchParams.passengers,
          oneway: true
        };
        let returningFlights;
        this.performSearch(returnSearchParams).subscribe(result => {
          returningFlights = result;
          if (returningFlights) {
            const searchResults: SearchResponse = {
              oneWayFlights: oneWayFlights,
              oneway: false,
              returningFlights: returningFlights,
              bookingDetails: searchParams
            };
            this.searchResults.emit(searchResults);
            this.loadingComponent.emit(false);
          }
        });
      }
    });
  }

  private oneWayFlightSearch(searchParams: BookingDetails) {
    let flights;
    this.performSearch(searchParams).subscribe(res => {
      flights = res;
      if (flights) {
        const searchResults: SearchResponse = {
          oneWayFlights: flights, oneway: true,
          returningFlights: [], bookingDetails: searchParams
        };
        this.searchResults.emit(searchResults);
        this.loadingComponent.emit(false);
      }
    });
  }

  performSearch(searchParams: BookingDetails) {
    let flightList: Flight[];
    return this.flightService.searchFlightAvailability(searchParams)
      .pipe(map((flights: Flight[]) => {
        flightList = flights;
        return flightList;
      }));
  }

}
