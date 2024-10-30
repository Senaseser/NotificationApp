import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardUser implements CanActivate  {

    constructor(private authService:AuthService,private router:Router,private cookieService:CookieService) {
   
    }
  canActivate(): boolean {
  
    if (this.authService.isLoggedIn() && this.authService.getRole() === 'User') {
      return true;
    }else {
      this.authService.logout(this.cookieService.get('mail'));
      return false;
    }
  }


};
