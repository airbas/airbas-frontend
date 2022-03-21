import {Component, OnInit} from '@angular/core';

import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialUser,
  AmazonLoginProvider
} from 'angularx-social-login';

import {Router} from '@angular/router';
import {OauthService} from '../services/oauth.service';
import {TokenService} from '../services/token.service';
import {TokenDto} from '../models/entity/token-dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginReq} from '../models/request/login-req';
import {LoginService} from '../services/login.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogloginComponent} from '../dialogerror/dialogerror.component';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  socialUser: SocialUser;
  form: FormGroup;

  constructor(
    // Service to send auth request to provider
    private authService: SocialAuthService,
    // Service to send auth request to server
    private oauthService: OauthService,
    private tokenService: TokenService,
    // Service to base login
    private loginService: LoginService,
    private dataService: DataService,
    private router: Router,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }


  openDialog() {
    this.dialog.open(DialogloginComponent, {data : { type: 'Errore',
                                                            error: 'Credenziali errate',
                                                            message: 'Email o password non risultano corrette, verifica i dati inseriti'}});
  }

  onSubmit(): void {
    const request = new LoginReq(this.username, this.password);
    this.loginService.login(request).subscribe(
      res => {
        console.log(res);
        this.tokenService.setToken(res.value);
        this.dataService.isAuth = true;
        this.dataService.userLoggedName = this.username;
        this.router.navigate(['/']);
      },
      err => {
        this.openDialog();
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        console.log(this.socialUser);
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

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
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

  logOut(): void {
    this.router.navigate(['/']);
    this.dataService.isAuth = false;
    this.dataService.userLoggedName = '';
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
}
