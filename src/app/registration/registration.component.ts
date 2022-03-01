import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LoginReq} from '../models/request/login-req';
import {Userbas} from '../models/entity/Userbas';

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
