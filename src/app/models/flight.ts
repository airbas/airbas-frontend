interface FlightTime {
  departure: string;
  arrival: string;
}

export interface Flight {
  flightNo: string;
  departure: string;
  arrival: string;
  time: FlightTime;
  date: Date;
  tariffa: number;
}
