import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { Router } from "@angular/router";
import { Category } from "src/app/interfaces/category";
import { DetailProduct } from "src/app/interfaces/detailProduct";
import { Entry } from "src/app/interfaces/entry";
import { Locker } from "src/app/interfaces/locker";
import { Product } from "src/app/interfaces/product";
import { Service } from "src/app/interfaces/service";
import { CategoryService } from "src/app/services/category.service";
import { DetailProductService } from "src/app/services/detailProduct.service";
import { ErrorFormService } from "src/app/services/errorForm.service";
import { ProductService } from "src/app/services/product.service";
import { ServiceService } from "src/app/services/service.service";
//falta
@Component({
    selector: 'detail-dialog',
    templateUrl: './detailProduct.dialog.html',
    styleUrls: ['./detailProduct.dialog.sass']
  })
  //customer
  export class DetailProductDialog implements OnInit {
    loginForm:FormGroup
    productData:[Product]
    categoryData:[Category]
    productSelect:Product
    constructor(
      public dialogRef: MatDialogRef<DetailProductDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Entry,
      private categoryService:CategoryService,
      private productService:ProductService,
      private detailService:DetailProductService,
      private formBuilder:FormBuilder,
      private errorform:ErrorFormService
    ) {
        this.loginForm = this.formBuilder.group({
            cant: ['', [Validators.required,Validators.min(1),Validators.max(20)]],
            price: 0,
            productId: ['',[Validators.required]],
            categoryId: ['',[Validators.required]],
            entryId: data.id,
          });
    }
    ngOnInit() {
      this.categoryService.list("/list/true")
      .subscribe(data => {
        console.log(data);
        this.categoryData = data;
      })
      /*this.productService.list("/true")
      .subscribe(data => {
        console.log(data);
        this.productData = data;
      })*/
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    create(): void {
      let data = this.loginForm.value
      data.price = this.productSelect.price
      data.entryId = this.data.id
      this.detailService.create(this.loginForm.value)
      .subscribe(res=>{
        console.log(res);
        
        this.dialogRef.close(true);
      })
    }
    validar(text:string,name:string){
        return this.errorform.validar(text,name,this.loginForm)
      }
      onChange(e:MatSelectChange){

        console.log(e);
       /* const selectedService =this.productData.find(data => data.id==e.value)
        this.productSelect = selectedService!*/
        this.productService.listByCategory(e.value,"/true")
          .subscribe(data => {
            console.log(data);
            this.productData = data;
          })
      }
      onChangeProduct(e:MatSelectChange){

        console.log(e);
        const selectedService =this.productData.find(data => data.id==e.value)
        this.productSelect = selectedService!
        
      }
      
  }
