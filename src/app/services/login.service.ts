import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenDto} from '../models/token-dto';
import {Observable} from 'rxjs';
import {Loginreq} from '../models/loginreq';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authURL = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(credentials: Loginreq): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.authURL + 'login', credentials, cabecera);
  }
}
