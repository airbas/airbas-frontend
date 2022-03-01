import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { Searchengine2Component } from './searchengine2/searchengine2.component';


const routes: Routes = [
  {path: '', component: Searchengine2Component},
  {path: 'home', component: Searchengine2Component},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegistrationComponent},
  {path: 'flights', component: FlightlistComponent}
  // , {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
