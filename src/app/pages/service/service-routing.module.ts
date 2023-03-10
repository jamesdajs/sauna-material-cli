import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service.component';

const routes: Routes = [{ path: '', component: ServiceComponent },
{ path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule) },
{ path: 'update', loadChildren: () => import('./update/update.module').then(m => m.UpdateModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
