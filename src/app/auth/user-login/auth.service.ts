import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {CookieService } from 'ngx-cookie-service';
import { Login } from '../../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly apiUrl = "https://localhost:44365/user/User/Login";

  constructor(private router: Router,
    private http:HttpClient,
    private cookieService:CookieService,
  ) { }

  login(email: string, password: string): Observable<Login> {
   return this.http.post<Login>(this.apiUrl,{email,password}).pipe(
    tap(response => {
      if (response && response.token && response.role && response.mail && response.id) {
        var expiration = new Date(Date.now()+ 60*60*1000);
        this.cookieService.set('token', response.token,{expires:expiration,path: '/user'});
        this.cookieService.set('role', response.role, {expires:expiration,path: '/user'});
        this.cookieService.set('mail',response.mail, {expires:expiration,path: '/user'});
        this.cookieService.set('id',response.id, {expires:expiration,path: '/user'});

      } 
      if(response.role === "User") {
        this.router.navigate(['/user/profile'], { replaceUrl: true });
      }
    }))
  }
  logout(): void {
    this.cookieService.delete('token', '/user');
    this.cookieService.delete('role', '/user');
    this.cookieService.delete('mail', '/user');
    this.cookieService.delete('id', '/user');
    
    this.router.navigate(['/user/login']).then(() => {
      window.location.reload();
    });
  }
  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }
  getRole(): string {
    return this.cookieService.get('role');
  }
}