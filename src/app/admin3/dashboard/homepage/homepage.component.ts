import { Component, OnInit } from '@angular/core';
import {ColDef,CellClassRules,GridApi,GridOptions,ModuleRegistry,RowClassRules, RowSelectionOptions} from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AdminService } from '../../admin.service';
import { RowData, User } from '../../../models/userResponse';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ActionsComponent } from './actions/actions.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomePageComponent implements OnInit {
  users:User[] = [];
  rowData:RowData[] = [];
  newUsername: string = "";
  newPassword: string = "";
  gridApi!: GridApi;
  themeClass: string = "ag-theme-quartz";
  selectedUser:RowData[] = [];

  constructor(private adminService:AdminService,public dialog: MatDialog) {
    
  }
  ngOnInit(): void {
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
      cellRenderer: (params:any) => {
        const isOnline = params.data.isOnline;
  
        return `<div style="color: ${isOnline ? 'green' : 'red'};display:flex;justify-content:center;font-weight:bold" class="${isOnline ? 'online' : 'offline'}" >
                  ${isOnline ? 'Current' : 'Offline'} 
                </div>`;
      },
      sortable:false,
      filter:false,
    },
    {
      headerName:"Actions",
      cellRenderer:ActionsComponent,
      cellRendererParams:{
        refreshUsers:()=> this.getUsers()
      },
      sortable:false,
      filter:false,
    }

    ];
    defaultColDef: ColDef = {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 1,
    };
  rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
    headerCheckbox: true,
  };
rowClassRules: RowClassRules = {
    "rag-red": (params) => params.data.make === "Ford",
  };
 paginationPageSize = 10;
 paginationPageSizeSelector: number[] | boolean = [5,10, 15, 20];

 onGridReady(params: any) {
  this.gridApi = params.api;
}
onSelectionChanged(){
  this.selectedUser = this.gridApi.getSelectedRows();
}
sendNotification(){
  const dialogRef = this.dialog.open(SendNotificationComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe(result => {
  });
  }

  getUsers(){
    this.adminService.getUsers().subscribe({
      next:(data:User[]) => {
        this.users = data;
        this.rowData = this.users.map(user => ({
          Id: user.id,       
          Email: user.email, 
          Username: user.userName 
        }));
      },
      error:(err) =>{
        console.error('Kullanıcı verileri alınırken bir hata oluştu:', err);
      }
    })
  }
  
  addUser(){
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
     this.getUsers();
    });
    }
  }
    
