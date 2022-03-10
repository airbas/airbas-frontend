import { Injectable } from '@angular/core';
import {Flight} from '../models/entity/flight';
import {Passenger} from '../models/entity/passenger';
import {Reservation} from '../models/entity/reservation';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  oneWayData: Flight[];
  selectedFlight: Flight[] = [];
  fullTripData: Flight[][];
  typeFlight: string;
  sourceCity: string;
  destCity: string;
  passengerForFlight: number;
  userLoggedName: string;
  isAuth = false;
  passengers: Passenger[] = [];
  reservations: Reservation[] = [];



  constructor() { }
}

