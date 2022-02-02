import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {Loginreq} from '../models/loginreq';
import {Userbas} from '../models/Userbas';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formSignIn: FormGroup;



  constructor( public fb: FormBuilder) {
    this.formSignIn = fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formSignIn.valid) {

    } else {
      // Print error
    }

  }
}
