import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayDetailComponent } from './day-detail.component';

const routes: Routes = [{ path: '', component: DayDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayDetailRoutingModule { }
