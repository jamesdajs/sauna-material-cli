import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { EntriesComponent } from './entries.component';

const routes: Routes = [{ path: 'pending-products',
 loadChildren: () => import('./pending-products/pending-products.module').then(m => m.PendingProductsModule),
 canActivate:[AuthGuard, RoleGuard],
 data: { roles: ['admin', 'user', 'delivery'] }
},
{ path: 'details', 
 loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
 canActivate:[AuthGuard, RoleGuard],
 data: { roles: ['admin', 'user', 'delivery'] }
},
{ path: '', component: EntriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
