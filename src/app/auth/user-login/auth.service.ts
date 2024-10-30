import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {CookieService } from 'ngx-cookie-service';
import { LoginUser, Logout, Notification } from '../../models/loginResponse';
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

  login(email: string, password: string): Observable<LoginUser> {
   return this.http.post<LoginUser>(`${this.url}/user/User/Login`,{email,password}).pipe(
    tap(response => {
      var expiration = new Date(Date.now()+ 60*60*1000);
      if (response && response.token && response.role && response.mail && response.id ) {
        this.cookieService.set('token', response.token,{expires:expiration,path: '/user'});
        this.cookieService.set('role', response.role, {expires:expiration,path: '/user'});
        this.cookieService.set('mail',response.mail, {expires:expiration,path: '/user'});
        this.cookieService.set('id',response.id, {expires:expiration,path: '/user'});

      } 
      if (response.notifications) {
        const notificationsJson = JSON.stringify(response.notifications);
        this.cookieService.set('notifications', notificationsJson, { expires: expiration, path: '/user' });
      }
      if(response.role === "User") {
        this.router.navigate(['/user/profile'], { replaceUrl: true });
      }
    }))
  }
  logout(email: string): Observable<Logout> {
    return this.http.post<Logout>(`${this.url}/user/User/Logout`,{email}).pipe(
      tap(response => {
        console.log(response);
    this.cookieService.delete('token', '/user');
    this.cookieService.delete('role', '/user');
    this.cookieService.delete('mail', '/user');
    this.cookieService.delete('id', '/user');
    
    this.router.navigate(['/user/login']);
  }))
  }
  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }
  getRole(): string {
    return this.cookieService.get('role');
  }
  getNotifications():Notification[]{
    const notifications = this.cookieService.get('notifications');
    return notifications ? JSON.parse(notifications) : [];
  }
}