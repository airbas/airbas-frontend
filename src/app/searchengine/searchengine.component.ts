import {Component, Input, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-searchengine',
  templateUrl: './searchengine.component.html',
  styleUrls: ['./searchengine.component.css']
})
export class SearchengineComponent implements OnInit {
  typeTrip: FormGroup;
  formSearchEngine: FormGroup;
  selectTrip: string;
  typeTrips: string[] = ['Andata e ritorno', 'Solo andata'];



  constructor( public fb: FormBuilder) {
    this.formSearchEngine = fb.group({
      departureDate: ['', Validators.required],
      departureCity : ['', Validators.required]
    });
    this.typeTrip = fb.group({
      options: ['1']
    });
    console.log(this.typeTrip);
  }

  ngOnInit(): void {
  }

}
