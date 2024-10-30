import { Component } from '@angular/core';
import {ColDef,CellClassRules,GridApi,RowClassRules, RowSelectionOptions} from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';

import { AdminService } from '../../admin.service';
import { RowData, User } from '../../../models/userResponse';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  users:User[] = [];
  rowData:RowData[] = [];
  newUsername: string = "";
  newPassword: string = "";
  gridApi!: GridApi;
  themeClass: string = "ag-theme-quartz";
  selectedUser:RowData[] = [];
  hubConnection!: signalR.HubConnection ;
  notifications:any = [{value:"bir"},{value:"iki"},{value:"üç"},{value:"dört"},{value:"beş"},{value:"altı"}];

  constructor(private adminService:AdminService,public dialog: MatDialog,private cookieService: CookieService) {

  }
  ngOnInit(): void {
    this.startConnection();
    this.getUsers();
  }
 
    columnDefs: ColDef[] = [
      { field: "Email"},
      { field: "Id", sortable:false,
        filter:false},
        {
          field:"Username",
        filter:"agTextColumnFilter",
        floatingFilter:true,
        },

    {
      headerName:"Current Status",
   field: "IsOnline",
   sortable:false,
        filter:false,
        cellRenderer: (params:any) => params.value ? `<div style="color:green;display:flex;justify-content:center;font-weight:bold">Online</div>` : `<div style="color:red;display:flex;justify-content:center;font-weight:bold">Offline</div>`, 
    },

    ];
    defaultColDef: ColDef = {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 1,
    };
 
rowClassRules: RowClassRules = {
    "rag-red": (params) => params.data.make === "Ford",
  };
 paginationPageSize = 10;
 paginationPageSizeSelector: number[] | boolean = [5,10, 15, 20];


  startConnection(){
  this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44365/notificationHub").configureLogging(signalR.LogLevel.Information).build();
  this.hubConnection.start()
  .then(() => {
      console.log('SignalR bağlantısı kuruldu.');
      this.hubConnection.on('ReceiveNotification', (notification: any) => {
        console.log('Gelen bildirim:', notification); 
      const userId = this.cookieService.get('id');
      if (notification.UserId === userId) {
        console.log(`${userId} id'li kullanıcı için bildirim alındı:`, notification);
        console.log('Başlık:', notification.Title);
        console.log('Mesaj:', notification.Message);
      }
      });
  })
  .catch(err => console.error('SignalR bağlantısı kurulurken hata:', err));

this.hubConnection.on('UserOnline', (userId: string) => {
  this.updateUserStatus(userId, true); 
});
this.hubConnection.on('UserOffline', (userId: string) => {
  this.updateUserStatus(userId, false);
});

  }
  updateUserStatus(userId: string, isOnline: boolean) {
    const user = this.rowData.find(u => u.Id === userId);
    if (user) {
        user.IsOnline = isOnline;
        this.gridApi.applyTransaction({update:[user]});
    }
}

  getUsers(){
    this.adminService.getUsers().subscribe({
      next:(data:User[]) => {
        this.users = data;
        this.rowData = this.users.map(user => ({
          Id: user.id,       
          Email: user.email, 
          Username: user.userName,
          IsOnline: user.isOnline 
        }));
      },
      error:(err) =>{
        console.error('Kullanıcı verileri alınırken bir hata oluştu:', err);
      }
    })
  }
  
  }
    
