import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Admin3RoutingModule } from './admin3-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HomePageComponent } from './dashboard/homepage/homepage.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { RegisterModalComponent } from './dashboard/homepage/register-modal/register-modal.component';
import { ActionsComponent } from './dashboard/homepage/actions/actions.component';
import { UpdateUserComponent } from './dashboard/homepage/actions/update-user/update-user.component';
import { DeleteUserComponent } from './dashboard/homepage/actions/delete-user/delete-user.component';
import { SendNotificationComponent } from './dashboard/homepage/send-notification/send-notification.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationComponent } from './dashboard/notification/notification.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomePageComponent,
    RegisterModalComponent,
    ActionsComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    SendNotificationComponent,
    NotificationComponent,

  ],
  imports: [
    CommonModule,
    Admin3RoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    AgGridModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class Admin3Module { }
