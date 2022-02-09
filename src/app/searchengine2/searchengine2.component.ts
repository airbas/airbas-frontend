import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-searchengine2',
  templateUrl: './searchengine2.component.html',
  styleUrls: ['./searchengine2.component.css']
})
export class Searchengine2Component implements OnInit {
  formSearchEngine: FormGroup;
  selectTrip: string;


  constructor( public fb: FormBuilder) {
    this.formSearchEngine = fb.group({
      departureDate: ['', Validators.required],
      departureCity : ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
