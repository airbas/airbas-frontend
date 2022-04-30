import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenDto} from '../models/entity/token-dto';
import {Observable} from 'rxjs';
import {LoginReq} from '../models/request/login-req';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authURL = 'http://localhost:80/api/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(credentials: LoginReq): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.authURL + 'login', credentials, cabecera);
  }
}
