import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../auth/user-login/auth.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  profile:string = "";
  constructor(private cookieService: CookieService,private authService: AuthService) {
    this.profile = this.cookieService.get('mail');
  }
  logout(){
    this.authService.logout();
  }


}