import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.css']
})
export class FlightlistComponent implements OnInit {
  listFlight: any[];
  constructor(private route: ActivatedRoute,
              public dataService: DataService) { }

  ngOnInit(): void {
    this.listFlight = this.dataService.serviceData;
    console.log(this.listFlight);
  }

}
