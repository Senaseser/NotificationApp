import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from './auth/admin-login/auth.guard';
import { AuthGuardUser } from './auth/user-login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' }, 
  { path: 'admin', loadChildren: () => import('./admin3/admin3.module').then(m => m.Admin3Module),canActivate:[AuthGuardAdmin]},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[AuthGuardUser]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//  { path: '**', redirectTo: 'admin/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
