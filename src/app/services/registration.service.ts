
import { Injectable } from '@angular/core';
import {SignupReq} from '../models/request/signup-req';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenDto} from '../models/entity/token-dto';


const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  signUpURL = 'http://localhost:80/api/auth/signup';

  constructor(private http: HttpClient) {}

  public signup(user: SignupReq): Observable<TokenDto> {
   return this.http.post<TokenDto>( this.signUpURL, user, cabecera);
  }
}
