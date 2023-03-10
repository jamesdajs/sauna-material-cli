import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CreateModule { }
