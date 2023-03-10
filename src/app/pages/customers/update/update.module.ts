import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [
    CommonModule,
    UpdateRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UpdateModule { }
