import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../models/entity/profile';
import {SearchFlightReq} from '../models/request/search-flight-req';
import {Flight} from '../models/entity/flight';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  baseURL = 'http://localhost:80/api/profile/';

  constructor(private httpClient: HttpClient) { }

  public details(mail: string): Observable<Profile> {
    return this.httpClient.get<Profile>(this.baseURL + 'details/' +  mail, cabecera);
  }

  public updateProfile(req: Profile): Observable<Profile> {
    return this.httpClient.post<Profile>(this.baseURL + 'update', req, cabecera);
  }

}
