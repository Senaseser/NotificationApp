import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {CookieService } from 'ngx-cookie-service';
import { Login } from '../../models/loginResponse';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.url;

  constructor(private router: Router,
    private http:HttpClient,
    private cookieService:CookieService,
  ) { }

  login(email: string, password: string): Observable<Login> {
   return this.http.post<Login>(`${this.url}/admin/Admin/Login`,{email,password}).pipe(
    tap(response => {
      if (response && response.token && response.role && response.mail && response.id) {
        var expiration = new Date(Date.now()+ 60*60*1000);
        this.cookieService.set('token', response.token,{expires:expiration,path: '/admin'});
        this.cookieService.set('role', response.role, {expires:expiration,path: '/admin'});
        this.cookieService.set('mail',response.mail, {expires:expiration,path: '/admin'});
        this.cookieService.set('id',response.id, {expires:expiration,path: '/admin'});

      } 
      if(response.role === "Admin") {
        this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
      }
    }
  ))
  }
  logout(): void {
    this.cookieService.delete('token', '/admin');
    this.cookieService.delete('role', '/admin');
    this.cookieService.delete('mail', '/admin');
    this.cookieService.delete('id', '/admin');

    this.router.navigate(['/admin/login']);
  }
  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  getRole(): string {
    return this.cookieService.get('role');
  }
}
