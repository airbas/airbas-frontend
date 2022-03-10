import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { SearchengineComponent } from './searchengine/searchengine.component';
import {SuccessComponent} from './success/success.component';


const routes: Routes = [
  {path: '', component: SearchengineComponent},
  {path: 'home', component: SearchengineComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegistrationComponent},
  {path: 'flights', component: FlightlistComponent},
  {path: 'success', component: SuccessComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
