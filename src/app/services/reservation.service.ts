import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginReq} from '../models/request/login-req';
import {Observable} from 'rxjs';
import {TokenDto} from '../models/entity/token-dto';
import {Reservation} from '../models/entity/reservation';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  resURL = 'http://localhost:8084/reservation/';

  constructor(private httpClient: HttpClient) { }

  public send(reservations: Reservation[]): Observable<Reservation[]> {
    console.log('Reservation READY TO SEND', reservations);
    return this.httpClient.post<Reservation[]>(this.resURL + 'creates', reservations, cabecera);
  }
}
