import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../models/entity/reservation';
import {TokenService} from './token.service';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  resURL = 'http://localhost:8080/api/res/';

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  public send(reservations: Reservation[]): Observable<Reservation[]> {
    return this.httpClient.post<Reservation[]>(this.resURL + 'creates', reservations, cabecera);
  }

  public get(mail: string): Observable<Reservation[]> {
    cabecera.headers = new HttpHeaders().set('Authorization', this.tokenService.getToken());
    return this.httpClient.get<Reservation[]>(this.resURL + 'get/' + mail, cabecera);
  }

  public delete(mail: string, cod: string): Observable<Reservation[]> {
    cabecera.headers = new HttpHeaders().set('Authorization', this.tokenService.getToken());
    return this.httpClient.get<Reservation[]>(this.resURL + 'delete/' + mail + '/' + cod, cabecera);
  }
}
