import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { Notification } from '../../../models/loginResponse';
import { AuthService } from '../../../auth/user-login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hubConnection!: signalR.HubConnection;
  notifications:Notification[] =[];

  constructor(private cookieService: CookieService,private authService:AuthService) {
    
  }

  ngOnInit(): void {
    this.notifications = this.authService.getNotifications();
    this.startSignalRConnection();
  }

  private startSignalRConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44365/notificationHub') 
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR bağlantısı kuruldu.');
        this.registerSignalRListeners();
      })
      .catch(err => console.error('SignalR bağlantısı kurulurken hata:', err));
      this.hubConnection.onreconnected(() => {
        console.log('SignalR bağlantısı yeniden kuruldu.');
      });
  
      this.hubConnection.onclose(() => {
        console.error('SignalR bağlantısı kapandı, tekrar bağlanılıyor...');
      });
    }

  private registerSignalRListeners(): void {
    this.hubConnection.on('ReceiveNotification', (notification: any) => {
     
    const userId = this.cookieService.get('id');
    if (notification.userId === userId) {
      this.notifications.push(notification);
    
    }
  });
  }


}
