import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../auth/user-login/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  email:string = "";
  constructor(private cookieService: CookieService,private authService: AuthService,private snackBar:MatSnackBar) {
    this.email = this.cookieService.get('mail');
  }
  logout(){
    this.authService.logout(this.email).subscribe({
      next:()=> {
            this.snackBar.open('Kullanıcı oturumu kapatıldı!', 'Kapat', {
            duration: 2000, 
            verticalPosition: 'bottom', 
            horizontalPosition: 'center' 
          });
        },
      error:(errorResponse)=>{
        console.log(errorResponse);
      }
    })
  }
  }
