import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then(m => m.UpdateModule),
    canActivate: [AuthGuard]
  },
  { path: 'dataupdate', 
  loadChildren: () => import('./data-update/data-update.module').then(m => m.DataUpdateModule) ,
  canActivate: [AuthGuard]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
