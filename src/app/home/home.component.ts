import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import {Userbas} from '../models/Userbas';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  userLogged: SocialUser;
  isLogged: boolean;
  formSerchEngine: FormGroup;


  constructor( public fb: FormBuilder) {
    this.formSerchEngine = fb.group({
      departureDate: ['', Validators.required],
      departureCity : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') != null) {
      this.isLogged = true;
      this.email = sessionStorage.getItem('user');
    }
  }

}
