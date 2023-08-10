import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayComponent } from './day.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [{ path: '', component: DayComponent ,},
{ path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayRoutingModule { }
