import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Customer } from 'src/app/interfaces/customer';
import * as moment from 'moment';
import { Product } from 'src/app/interfaces/product';
import { Entry } from 'src/app/interfaces/entry';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

moment.locale('es');
export interface DialogData {
    title: string;
    message: string;
  }
  export interface DialogDataPromt {
    title: string;
    message: string;
    cant:number;
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
    urlimg = environment.urlimg;
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
  @Component({
    selector: 'user-dialog',
    templateUrl: 'user.dialog.html',
  })
  //customer
  export class UserDialog {
    
    constructor(
      public dialogRef: MatDialogRef<ProductDialog>,
      @Inject(MAT_DIALOG_DATA) public data: User,
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
  selector: 'dialog-overview-example',
  templateUrl: 'promt.dialog.html',
})
export class PromtDialog {
  cant:number = 0;
  
  constructor(
      public dialogRef: MatDialogRef<PromtDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogDataPromt,
    ) {
      this.cant = data.cant;
    }  
  onNoClick(): void {
    this.dialogRef.close();
  }
  sendData():void{
    this.dialogRef.close({cant:this.cant});
  }
}