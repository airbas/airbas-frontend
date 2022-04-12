import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {Flight} from '../models/entity/flight';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {Reservation} from '../models/entity/reservation';
import {ReservationService} from '../services/reservation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.css']
})
export class FlightlistComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  source: string;
  destination: string;
  finalPrice = 0;
  listFlightTo: Flight[];
  listFlightFrom: Flight[];
  passengers: any[];
  email = '';


  constructor(public dataService: DataService,
              public resService: ReservationService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    this.source = this.dataService.sourceCity;
    this.destination = this.dataService.destCity;
    if (this.dataService.typeFlight === 'ONE_WAY') {
      if (this.dataService.oneWayData !== undefined) {
        this.listFlightTo = this.fillHour(this.dataService.oneWayData);
      } else {
        this.router.navigate(['/']);
      }

    } else {
      if (this.dataService.fullTripData !== undefined) {
        this.listFlightTo = this.fillHour(this.dataService.fullTripData[0]);
        this.listFlightFrom = this.fillHour(this.dataService.fullTripData[1]);
      } else {
        this.router.navigate(['/']);
      }
    }
    this.passengers = Array(this.dataService.passengerForFlight).fill(0).map((x, i) => i);

  }

  fillHour(listFlight: Flight[]): Flight[] {
    // tslint:disable-next-line:forin
    for (const f in listFlight) {
      const isoDateDep = listFlight[f].departureDate;
      listFlight[f].depHours = isoDateDep.match(/\d\d:\d\d/)[0];
      const isoDateArr = listFlight[f].arrivalDate;
      listFlight[f].arrHours = isoDateArr.match(/\d\d:\d\d/)[0];
    }
    return listFlight;
  }

  openDialogStep(msg: string) {
    this.dialog.open(DialogloginComponent, {
      data: {
        type: 'Attenzione',
        error: 'Dati mancanti',
        message: msg
      }
    });
  }

  firstStep(): void {
    // tslint:disable-next-line:triple-equals
    if (this.dataService.selectedFlight.length == 0) {
      this.openDialogStep('Selezionare almeno un volo per proseguire');
    } else {
      this.stepper.next();
    }
  }

  secondStep(): void {
    const flights = this.dataService.selectedFlight;
    const seat = this.dataService.seatList;

    let secondStepOK = true;
    for (const f of flights) {
      this.finalPrice += Number(f.price);
      if (f.seat == null) {
        secondStepOK = false;
      }
    }
    if (secondStepOK) {
      this.createReservation();
      this.stepper.next();
    } else {
      this.openDialogStep('Selezionare i posti dei voli selezionati');
    }
  }

  createReservation() {
    // console.log('Flights');
    // console.log(this.dataService.selectedFlight);
    const reservations: Reservation[] = [];
    const flights: Flight[] = this.dataService.selectedFlight;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < flights.length; i++) {
      // secondo loop must to change se seat
      for (let j = 0; j < this.dataService.passengerForFlight; j++) {
        const reservation = new Reservation();
        reservation.flightName = flights[i].name;
        reservation.usermail = this.dataService.userLoggedName;
        reservation.airPlaneName = flights[i].airPlaneName;
        reservation.seatCord = flights[i].seat[j];
        reservation.dapartureAirport = flights[i].departureAirport;
        reservation.arrivalAirport = flights[i].arrivalAirport;
        reservation.date = flights[i].departureDate;
        reservation.rate = flights[i].rate;
        reservations.push(reservation);
      }
    }
    this.dataService.reservations = reservations;
    // console.log('Reservation');
    // console.log(this.dataService.reservations);
  }

  updateReservation() {
    // Setting mail
    if (!this.dataService.isAuth) {
      for (const res of this.dataService.reservations) {
        res.usermail = this.email;
      }
    } else {
      for (const res of this.dataService.reservations) {
        res.usermail = this.dataService.userLoggedName;
      }
    }
    // Setting passanger
    let index;
    for (const flight of this.dataService.selectedFlight) {
      const name = flight.name;
      const resFilter = this.dataService.reservations
        .filter((r: Reservation) => r.flightName === name);

      console.log('Passanger');
      console.log(this.dataService.passengers);

      index = 0;
      for (const res of resFilter) {
        res.passangerName = this.dataService.passengers[index].name;
        res.passangerSurname = this.dataService.passengers[index].cognome;
        res.passangerPhone = this.dataService.passengers[index].phone;
        res.passengerDate = this.dataService.passengers[index].date.toISOString();
        index += 1;
      }
      index = 0;
    }
  }


  thirdStep() {
    let count = 0;
    if (!this.dataService.isAuth) {
      if (this.email === '') {
        this.openDialogStep('Dato che non risulati autenticato l\'email è obbligatoria');
        return;
      }
    }
    if (this.dataService.passengers.length > 0) {
      for (const p of this.dataService.passengers) {
        if (p.date !== null && p.name !== '' && p.cognome !== '' && p.phone !== '') {
          count += 1;
        }
      }
      if (count === this.dataService.passengerForFlight) {
        this.sendReservations();
        return;
      } else {
        this.openDialogStep('Compilare i dati relativi ai passeggeri o conferma i dati per ogni passeggero');
        return;
      }
    } else {
      this.openDialogStep('Compilare i dati relativi ai passeggeri o conferma i dati per ogni passeggero');
      return;
    }
  }

  sendReservations(): void {
    this.updateReservation();
    this.resService.send(this.dataService.reservations).subscribe(
      res => {
        // console.log(res);
        // tslint:disable-next-line:no-unused-expression
        this.dataService.reservations = [];
        this.dataService.selectedFlight = [];
        this.router.navigate(['/success']);
      },
    );
  }
}
