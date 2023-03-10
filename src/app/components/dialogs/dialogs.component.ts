import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Customer } from 'src/app/interfaces/customer';
import * as moment from 'moment';
import { Product } from 'src/app/interfaces/product';
moment.locale('es');
export interface DialogData {
    title: string;
    message: string;
  }
//alert
@Component({
    selector: 'alert-dialog',
    templateUrl: 'alert.dialog.html',
  })
  export class AlertDialog {
    constructor(
      public dialogRef: MatDialogRef<AlertDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

  @Component({
    selector: 'confim-dialog',
    templateUrl: 'confirm.dialog.html',
  })
  //confirm
  export class ConfirmDialog {
    constructor(
      public dialogRef: MatDialogRef<ConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  @Component({
    selector: 'customer-dialog',
    templateUrl: 'customer.dialog.html',
  })
  //customer
  export class CustomerDialog {
    
    constructor(
      public dialogRef: MatDialogRef<CustomerDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Customer,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    formatDate(date:string){
      let m = moment(date);
      return m.format('LLL');
    }
  }
  @Component({
    selector: 'product-dialog',
    templateUrl: 'product.dialog.html',
  })
  //customer
  export class ProductDialog {
    
    constructor(
      public dialogRef: MatDialogRef<ProductDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Product,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    formatDate(date:string){
      let m = moment(date);
      return m.format('LLL');
    }
  }