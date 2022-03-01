import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/entity/flight';
import { BookingDetails } from '../models/booking-details';
import { map } from 'rxjs/operators';

const apiUrl = 'http://localhost:8080/api/flights/';
@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  constructor(private http: HttpClient) { }

  public searchFlightAvailability(searchParams: BookingDetails) {
    return this.http.get(apiUrl)
      .pipe(map(data => this.flightSearch(data, searchParams)));
  }

  public getCityList() {
    return this.http.get(apiUrl)
      .pipe(map(data => this.extractCities(data)));
  }

  public extractCities(flightData: any) {
    const allCities: string[] = [];
    flightData.flights.map(x => {
      allCities.push(x.source);
      allCities.push(x.destination);
    });

    const distinctCities = allCities.filter((x, index, originalArr) => {
      return index === originalArr.indexOf(x);
    });
    return distinctCities;
  }

  private flightSearch(data: any, searchParams: BookingDetails) {
    data.flights.map(x => x.fare = parseInt(x.fare, 10));
    const allFlights: Flight[] = data.flights;
    return this.getAvailableFlights(this.sortFlightArray(allFlights), searchParams);
  }

  private sortFlightArray(flightData: Flight[]) {
    flightData.sort((x, y) => {
      return x.tariffa - y.tariffa;
    });
    return flightData;
  }

  private getAvailableFlights(sortedFlightData: Flight[], searchParams: BookingDetails) {
    const filteredItmes: Flight[] = [];
    const dataInRange: Flight[] = [];
    sortedFlightData.map((x) => {
      x.tariffa <= searchParams.refine ? dataInRange.push(x) : console.log('Not in range');
    });
    dataInRange.map((x) => {
      if (x.date.toString().slice(0, 10) === this.formatDate(searchParams.departDate).toString()) {
        if ((x.departure === searchParams.departure
          && x.arrival === searchParams.arrival)) {
          filteredItmes.push(x);
        }
      }
    });
    console.log('filter', filteredItmes);
    return filteredItmes;
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    month.length < 2 ? (month = '0' + month) : month = month;
    day.length < 2 ? (day = '0' + day) : day = day;

    return [year, month, day].join('-');
  }
}
