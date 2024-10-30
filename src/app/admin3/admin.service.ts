import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { AddUser, User } from '../models/userResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient,private cookieService:CookieService,private snackBar:MatSnackBar) { }

  getUsers():Observable <User[]> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<User[]>(`${this.apiUrl}/Operations/GetUsers`,{headers});
  }
  addUser(email:string,password:string):Observable<AddUser> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AddUser>(`${this.apiUrl}/Operations/Register`,{email,password},{headers}).pipe(
      tap(response => {
        if (response && response.mail && response.id) {
          this.snackBar.open('Kullanıcı eklendi!', 'Kapat', {
            duration: 2000, 
            verticalPosition: 'bottom', 
            horizontalPosition: 'center' 
          });
        }
      }
    ))
  }
  updateUser(userName:string,email:string,id:string):Observable<User> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<User>(`${this.apiUrl}/Operations/UpdateUser/${id}`,{userName,email},{headers}).pipe(
      tap(response => {
        if (response && response.email && response.id && response.userName ) {
          this.snackBar.open('Kullanıcı bilgileri güncellendi!', 'Kapat', {
            duration: 2000, 
            verticalPosition: 'bottom', 
            horizontalPosition: 'center' 
          });
        }
      }
    ))
  }
  deleteUser(id:string):Observable<{message:string}> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<{message:string}>(`${this.apiUrl}/Operations/DeleteUser/${id}`,{headers}).pipe(
      tap(response => {
        if (response && response.message === "Delete successfully"  ) {
          this.snackBar.open('Kullanıcı silindi!', 'Kapat', {
            duration: 2000, 
            verticalPosition: 'bottom', 
            horizontalPosition: 'center' 
          });
        }
      }
    ))
  }
  sendMessage(title:string,message:string,userIds:string[]):Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<any>(`${this.apiUrl}/Notification/Send`,{title,message,userIds},{headers}).pipe(
      tap(response => {
        if (response && response.message === "Bildirim gönderme işlemi tamamlandı"  ) {
          this.snackBar.open('Bildirim gönderme işlemi tamamlandı!', 'Kapat', {
            duration: 2000, 
            verticalPosition: 'bottom', 
            horizontalPosition: 'center' 
          });
        }
      }
    ))
  }
}