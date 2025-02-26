import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './dashboard/notification/notification.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notifications', component: NotificationComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Admin3RoutingModule { }