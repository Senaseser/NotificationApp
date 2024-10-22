import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RowData } from '../../../../models/userResponse';
import { UpdateUserComponent } from './update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent implements ICellRendererAngularComp{
  params:any;
  refreshUsers: (() => void) | undefined ;
  refresh(params: ICellRendererParams<RowData>): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(public dialog:MatDialog) {
  }
 
  agInit(params: any): void {
    this.params = params;
    this.refreshUsers = params.refreshUsers; 
  }

  onEdit() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: {
        id: this.params.data.Id, 
        userName: this.params.data.Username,
        email:this.params.data.Email,
      }
    });

   dialogRef.afterClosed().subscribe(result => {
   if(result && this.refreshUsers){
  this.refreshUsers();
   }
    })
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: {
        id: this.params.data.Id, 
        userName: this.params.data.Username,
        email:this.params.data.Email,
      }
    });

   dialogRef.afterClosed().subscribe(result => {
   if(result && this.refreshUsers){
  this.refreshUsers();
   }
    })
    
  }
}

