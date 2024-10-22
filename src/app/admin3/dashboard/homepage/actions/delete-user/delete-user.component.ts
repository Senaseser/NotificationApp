import { Component, Inject } from '@angular/core';
import { AdminService } from '../../../../admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../models/userResponse';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  constructor(
    private adminService:AdminService,
    private dialogRef:MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User ) {
  }

   handleDelete(){
    this.adminService.deleteUser(this.data.id).subscribe({
      next:()=>{
        this.dialogRef.close(true); 
      },
      error:()=>{
        
      }
    })
   }
}
