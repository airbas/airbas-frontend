export class SearchFlightReq {
  departureCity: string;
  destinationCity: string;
  passenger: number;
  returnDate: string;
  departureDate: string;


  constructor(departureCity: string, destinationCity: string, passenger: number) {
    this.departureCity = departureCity;
    this.destinationCity = destinationCity;
    this.passenger = passenger;
  }

  setReturnDate(value: string) {
    this.returnDate = value;
  }

  setDepartureDate(value: string) {
    this.departureDate = value;
  }
}
