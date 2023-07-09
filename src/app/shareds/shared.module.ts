import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';

import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { ValidationComponent } from '../components/validation/validation.component';
import { AlertDialog, ConfirmDialog, CustomerDialog, ProductDialog } from '../components/dialogs/dialogs.component';
import { DetailDialog } from '../components/dialogs/detail/detail.dialog';
import { DetailProductDialog } from '../components/dialogs/detailProduct/detailProduct.dialog';
@NgModule({
 imports:      [ 
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
],
 declarations: [
    NavBarComponent,
    ValidationComponent,
    AlertDialog,
    ConfirmDialog,
    CustomerDialog,
    ProductDialog,
    DetailDialog,
    DetailProductDialog,
],
 exports:      [
     MatToolbarModule,
     NavBarComponent,
     CommonModule,
     FormsModule,
     MatInputModule,
     MatFormFieldModule,
     MatIconModule,
     MatButtonModule,
     MatCardModule,
     MatTableModule,
     MatPaginatorModule,
     MatGridListModule,
     MatSelectModule,
     ValidationComponent,
     MatDialogModule,
     AlertDialog,
     ConfirmDialog,
     CustomerDialog,
     MatMenuModule,
     MatProgressBarModule,
     ProductDialog,
     DetailDialog,
     DetailProductDialog,
     ReactiveFormsModule,
     MatTooltipModule,
     MatDividerModule
    ]
})
export class SharedModule { }