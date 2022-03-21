import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {Flight} from '../models/entity/flight';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {Reservation} from '../models/entity/reservation';
import {ReservationService} from '../services/reservation.service';

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
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.source = this.dataService.sourceCity;
    this.destination = this.dataService.destCity;
    console.log(this.dataService.typeFlight);
    if (this.dataService.typeFlight === 'ONE_WAY') {
      this.listFlightTo = this.fillHour(this.dataService.oneWayData);
    } else {
      this.listFlightTo = this.fillHour(this.dataService.fullTripData[0]);
      this.listFlightFrom = this.fillHour(this.dataService.fullTripData[1]);
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
        reservation.seatCord = flights[i].seat;
        reservation.rate = 'BASE';
        reservations.push(reservation);
      }
      this.dataService.reservations = reservations;
    }
  }

  updateReservation() {
    for (const res of this.dataService.reservations) {
      // fix get only the first passegner
      // res.passangerDate = this.dataService.passengers[0].date;
      res.passangerName = this.dataService.passengers[0].name;
      res.passangerSurname = this.dataService.passengers[0].cognome;
      res.passangerPhone = this.dataService.passengers[0].phone;
      res.passangerDate = this.dataService.passengers[0].date;
    }
  }


  thirdStep() {
    let count = 0;
    if (!this.dataService.isAuth && this.email === '') {
      this.openDialogStep('Dato che non risulati autenticato l\'email è obbligatoria');
      return;
    }
    if (this.dataService.passengers.length > 0) {
      for (const p of this.dataService.passengers) {
        if (p.date !== '' && p.name !== '' && p.cognome !== '' && p.phone !== '') {
          count += 1;
        }
      }
      if (count === this.dataService.passengerForFlight) {
        this.sendReservations();
        // this.router.navigate(['/success']);
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
        console.log(res);
        // tslint:disable-next-line:no-unused-expression
        // this.router.navigate(['/success']);
      },
    );
  }
}
