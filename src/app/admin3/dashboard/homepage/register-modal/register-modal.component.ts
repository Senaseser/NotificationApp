import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  newEmail:string = "";
  newPassword:string = "";
  registerError:string = "";


  constructor(private adminService:AdminService,private dialogRef: MatDialogRef<RegisterModalComponent>) {
  }
  handleSave(){
    this.adminService.addUser(this.newEmail,this.newPassword).subscribe({
      next:()=>{
        this.dialogRef.close(); 
      },
      error:(errorResponse)=>{
        this.registerError = errorResponse?.error || 'Add User Failed';
      }
    })
  }

}
