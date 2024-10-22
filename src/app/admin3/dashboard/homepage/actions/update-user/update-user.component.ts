import { Component, Inject } from '@angular/core';
import { AdminService } from '../../../../admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../models/userResponse';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  constructor(
    private adminService:AdminService,
    private dialogRef:MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User ) {
  }

  newUsername:string = "";
  newEmail:string = "";
  updateError:string = "";

  ngOnInit():void{
    this.newUsername = this.data.userName;
    this.newEmail = this.data.email;
  }

  handleSave(){
    this.adminService.updateUser(this.newUsername,this.newEmail,this.data.id).subscribe({
      next:()=>{
        this.dialogRef.close(true); 
      },
      error:(errorResponse)=>{
        this.updateError = errorResponse?.error || 'Update User Failed';
      }
    })
  }


}
