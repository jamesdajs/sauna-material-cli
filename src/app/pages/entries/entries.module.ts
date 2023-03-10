import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent } from './entries.component';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    EntriesComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    SharedModule
  ]
})
export class EntriesModule { }
