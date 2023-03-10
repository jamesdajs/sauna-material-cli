import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationComponent } from 'src/app/components/validation/validation.component';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule { }
