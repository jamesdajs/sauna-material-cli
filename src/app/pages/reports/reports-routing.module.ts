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
{ path: 'detail', loadChildren: () => import('./day-detail/day-detail.module').then(m => m.DayDetailModule), canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
