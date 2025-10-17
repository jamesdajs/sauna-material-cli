import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [{ path: '', component: ReportsComponent },
{
  path: 'day',

  loadChildren: () => import('./day/day.module').then(m => m.DayModule),
  canActivate: [AuthGuard]
},
{
  path: 'detail',
  loadChildren: () => import('./day-detail/day-detail.module').then(m => m.DayDetailModule),
  canActivate: [AuthGuard]
},
{
  path: 'detailuser',
  loadChildren: () => import('./day-detail-byuser/day-detail.module').then(m => m.DayDetailModule),
  canActivate: [AuthGuard]
},
{
  path: 'product',
  loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  canActivate: [AuthGuard]
},
{
  path: 'service',
  loadChildren: () => import('./service/service.module').then(m => m.ServiceModule),
  canActivate: [AuthGuard]
},
{
  path: 'customer',
  loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
  canActivate: [AuthGuard]
},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
