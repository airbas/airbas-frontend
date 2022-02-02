import { Component, OnInit } from '@angular/core';

import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialUser,
  AmazonLoginProvider
} from 'angularx-social-login';

import { Router } from '@angular/router';
import { OauthService } from '../services/oauth.service';
import { TokenService } from '../services/token.service';
import { TokenDto } from '../models/token-dto';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Loginreq} from '../models/loginreq';
import {LoginService} from '../services/login.service';
import {Userbas} from '../models/Userbas';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;
  userLogged: SocialUser;
  userbasLogged: Userbas;
  isLogged: boolean;
  form: FormGroup;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private loginService: LoginService,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required]});
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const loginReq = new Loginreq(this.form.value.email, this.form.value.password);
      this.loginService.login(loginReq).subscribe(
        res => {
          console.log(res);
          this.userbasLogged = new Userbas();
          this.userbasLogged.email = 'pippocandeggina';
          sessionStorage.setItem('user', this.userbasLogged.email);
          this.isLogged = true;
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.logOut();
        }
      );
    } else {
      // Print error
    }

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        this.userbasLogged = new Userbas();
        this.userbasLogged.email = this.socialUser.email;
        sessionStorage.setItem('user', this.socialUser.email);
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
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

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFace).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
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
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.isLogged = false;
  }

  signInWithAmazon(): void {
    this.authService.signIn(AmazonLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.amazon(tokenFace).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
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
}
