import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CatagoriesComponent } from './catagories.component';

const routes: Routes = [
  { path: '', component: CatagoriesComponent ,
  },
  { path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule),canActivate:[AuthGuard] },
  { path: 'update', loadChildren: () => import('./update/update.module').then(m => m.UpdateModule),canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatagoriesRoutingModule { }
