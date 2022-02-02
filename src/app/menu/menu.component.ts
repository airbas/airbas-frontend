import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  email: string;
  userLogged: SocialUser;
  isLogged: boolean;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') != null) {
      this.isLogged = true;
      this.email = sessionStorage.getItem('user');
    }
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.isLogged = false;
    this.ngOnInit();
  }

}
