import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardAdmin implements CanActivate  {

    constructor(private authService:AuthService,private router:Router) {
   
      
    }
  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getRole() === 'Admin') {
      return true;
    }else {
      this.authService.logout();
      return false;
    }
  }


};
