import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../auth/admin-login/auth.service';

@Component({
  selector: 'app-navbar-admin',
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
