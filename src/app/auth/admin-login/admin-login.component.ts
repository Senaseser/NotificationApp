import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email :string = '';
  password :string = '';
  loginError :string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onLogin(){
    this.authService.login(this.email,this.password).subscribe({
      next:()=> {

      },
      error:(errorResponse)=>{
        this.loginError = errorResponse?.error ||"Login failded";
      }
    })
  }
  navigateToUserLogin():void{
    this.router.navigate(['/user/login']).then(() => {
      window.location.reload();
    });
  }
 
}
