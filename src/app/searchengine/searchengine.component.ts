import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-searchengine',
  templateUrl: './searchengine.component.html',
  styleUrls: ['./searchengine.component.css']
})
export class SearchengineComponent implements OnInit {
  formSearchEngine: FormGroup;


  constructor( public fb: FormBuilder) {
    this.formSearchEngine = fb.group({
      departureDate: ['', Validators.required],
      departureCity : ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
