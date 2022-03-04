import { Injectable } from '@angular/core';
import {Flight} from '../models/entity/flight';

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


  constructor() { }
}

