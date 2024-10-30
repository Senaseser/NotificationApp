import { Component, Inject } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RowData } from '../../../../models/userResponse';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrl: './send-notification.component.css'
})
export class SendNotificationComponent {
  message:string = "";
  title:string = "";
  sendError:string = "";
  
  constructor(private adminService:AdminService,
    private dialogRef:MatDialogRef<SendNotificationComponent>,@Inject(MAT_DIALOG_DATA) public data:any ) {
 
  }
  handleSend(){
    console.log(this.data);
    const userIds: string[] = this.data.selectedUser.map((row: { Id: string; }) => row.Id);
    console.log(userIds);
    this.adminService.sendMessage(this.title,this.message,userIds).subscribe({
      next:()=>{
        this.dialogRef.close(true); 
      },
      error:(errorResponse)=>{
        this.sendError = errorResponse?.error || 'Send Message Failed';
      }
    })
  }

}
