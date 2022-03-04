import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchFlightReq} from '../models/request/search-flight-req';
import {Flight} from '../models/entity/flight';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};


@Injectable({
  providedIn: 'root'
})

export class SearchFlightService {
  flightsURL = 'http://localhost:8083/flights/';

  constructor(private httpClient: HttpClient) { }

  public searchOneWay(req: SearchFlightReq): Observable<Flight[]> {
    return this.httpClient.post<Flight[]>(this.flightsURL + 'justGone', req, cabecera);
  }

  public searchFullTrip(req: SearchFlightReq): Observable<Flight[][]> {
    return this.httpClient.post<Flight[][]>(this.flightsURL + 'fullTrip', req, cabecera);
  }

  public getCity(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.flightsURL + 'cities', cabecera);
  }


}
