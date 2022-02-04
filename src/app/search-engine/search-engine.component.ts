import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  formSerchEngine: FormGroup;

  constructor( public fb: FormBuilder) {
    this.formSerchEngine = fb.group({
      departureDate: ['', Validators.required],
      departureCity : ['', Validators.required]
    });
  }
  ngOnInit(): void {}

}
