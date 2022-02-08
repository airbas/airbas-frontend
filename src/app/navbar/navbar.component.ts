import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated = false;

  constructor() { }

  ngOnInit(): void {
  }

  public logout(): void {
    console.log('ciao');
  }

}
