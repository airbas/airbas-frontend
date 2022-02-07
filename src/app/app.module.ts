import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { SearchengineComponent } from './searchengine/searchengine.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider,  AmazonLoginProvider, } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    FooterComponent,
    SearchengineComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SocialLoginModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatGridListModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        FormsModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '207213984196-ooeq2mjv0ig9li3pmnj43o29s0nna2oo.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('971220263486307'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider('amzn1.application-oa2-client.b8ff11881c0d4b8d8ea5568e2a7cb0a5'),
          },
        ],
      } as SocialAuthServiceConfig,
    }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


