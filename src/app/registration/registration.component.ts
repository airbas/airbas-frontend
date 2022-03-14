import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {Userbas} from '../models/entity/Userbas';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {MatDialog} from '@angular/material/dialog';
import {AmazonLoginProvider, FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {OauthService} from '../services/oauth.service';
import {TokenService} from '../services/token.service';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {TokenDto} from '../models/entity/token-dto';
import {RegistrationService} from '../services/registration.service';
import {SignupReq} from '../models/request/signup-req';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myGroup: FormGroup;
  public firstname = '';
  public  lastname = '';
  public email = '';
  public password = '';
  public birthdate = '';
  public telephone = '';
  public creditcard = '';
  socialUser: SocialUser;
  // user = new Userbas();
  msg = '';

  constructor( public fb: FormBuilder,
               public  dialog: MatDialog,
               private autService: SocialAuthService,
               private oauthService: OauthService,
               private tokenService: TokenService,
               private dataService: DataService,
               private router: Router,
               private service: RegistrationService) {
    this.myGroup = fb.group({
      firstname : ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      birthdate : ['', Validators.required],
      telephone : ['', Validators.required],
      creditcard: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogloginComponent, {data : { type: 'Errore',
        error: 'Dati inseriti non corretti',
        message: 'i dati inseriti per la registrazione non rispettano i canoni'}});
  }


  onSubmit(): void {
    const request = new SignupReq(this.firstname,
      this.lastname,
      this.email,
      this.password,
      this.birthdate,
      this.telephone,
      this.creditcard);
    this.service.signup(request).subscribe(
      res => {
        console.log(res);
        this.msg = 'Registrazione avvenuta con successo !';
        this.dataService.isAuth = true;
       // this.dataService.userLoggedName = this.email
        this.router.navigate(['/']);
      },
      error => {
        console.log('Exception occured');
        this.msg = error.error;
      }
    );
  }

  signUpWithGoogle(): void {
    this.autService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.dataService.isAuth = true;
            this.dataService.userLoggedName = this.socialUser.email;
            this.router.navigate(['/']);
          },
          err => {
            this.openDialog();
          }
        );
      }
    ).catch(
      err => {
        this.openDialog();
      }
    );
  }

  signUpWithFB(): void {
    this.autService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFace).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.dataService.isAuth = true;
            this.dataService.userLoggedName = this.socialUser.email;
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  signUpWithAmazon(): void {
    this.autService.signIn(AmazonLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.amazon(tokenFace).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.dataService.isAuth = true;
            this.dataService.userLoggedName = this.socialUser.email;
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut(): void {
    this.router.navigate(['/']);
    this.dataService.isAuth = false;
    this.dataService.userLoggedName = '';
  }
}
