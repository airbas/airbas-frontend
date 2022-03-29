import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../models/entity/profile';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  baseURL = 'http://localhost:8080/api/profile/details/';

  constructor(private httpClient: HttpClient) { }

  public details(mail: string): Observable<Profile> {
    return this.httpClient.get<Profile>(this.baseURL + mail, cabecera);
  }
}
