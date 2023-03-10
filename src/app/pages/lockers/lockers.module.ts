import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockersRoutingModule } from './lockers-routing.module';
import { LockersComponent } from './lockers.component';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    LockersComponent
  ],
  imports: [
    CommonModule,
    LockersRoutingModule,
    SharedModule
  ]
})
export class LockersModule { }
