import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  email :string = '';
  password :string = '';
  loginError :string = '';
 
  constructor(private authService:AuthService,private router: Router) { 
  }

  onLogin(){
    this.authService.login(this.email,this.password).subscribe({
      next:()=> {

      },
      error:(errorResponse)=>{
        this.loginError = errorResponse?.error ||"Login failded";
      }
    })
  }
  navigateToAdminLogin():void{
    this.router.navigate(['/admin/login']).then(() => {
      window.location.reload();
    });
  }

}
