import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EntriesComponent } from './entries.component';

const routes: Routes = [{ path: '', component: EntriesComponent },
{ path: 'details', 
 loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
 canActivate:[AuthGuard] 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
