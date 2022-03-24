import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../models/entity/reservation';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  resURL = 'http://localhost:8080/api/res/';
  tmpURL = 'http://localhost:8084/reservation/get/';

  constructor(private httpClient: HttpClient) { }

  public send(reservations: Reservation[]): Observable<Reservation[]> {
    return this.httpClient.post<Reservation[]>(this.resURL + 'creates', reservations, cabecera);
  }

  public get(mail: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.tmpURL + mail, cabecera);
  }
}
