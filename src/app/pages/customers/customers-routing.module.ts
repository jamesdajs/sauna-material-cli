import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'user', 'receptionist'] }
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then(m => m.UpdateModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'user'] }
  },
  {
    path: 'entries',
    loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'user', 'receptionist', 'delivery'] }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
