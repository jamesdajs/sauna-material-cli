import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionListChange } from "@angular/material/list";
import { MatSelectChange } from "@angular/material/select";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { Category } from "src/app/interfaces/category";
import { DetailProduct, DetailProductCreateRequest,  } from "src/app/interfaces/detailProduct";
import { Entry } from "src/app/interfaces/entry";
import { Locker } from "src/app/interfaces/locker";
import { Product } from "src/app/interfaces/product";
import { Service } from "src/app/interfaces/service";
import { CategoryService } from "src/app/services/category.service";
import { DetailProductService } from "src/app/services/detailProduct.service";
import { ErrorFormService } from "src/app/services/errorForm.service";
import { ProductService } from "src/app/services/product.service";
import { ServiceService } from "src/app/services/service.service";
import { environment } from "src/environments/environment";

//falta
@Component({
    selector: 'detail-dialog',
    templateUrl: './detailProduct.dialog.html',
    styleUrls: ['./detailProduct.dialog.sass']
  })
  //customer
  export class DetailProductDialog implements OnInit {
    loginForm:FormGroup
    productData: Product[] = []
    categoryData: Category[] = []
    arrayProductSelect:DetailProductCreateRequest[] = []
    urlimg = environment.urlimg;
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
      if (!this.arrayProductSelect.length) {
        return;
      }

      const requests = this.arrayProductSelect.map(product =>
        this.detailService.create({
          ...product,
          entryId: this.data.id,
        })
      );

      forkJoin(requests).subscribe(() => {
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
      selectCategory(id:string){
        this.productService.listByCategory(id,"/true")
          .subscribe(data => {
            console.log(data);
            this.productData = data;
          })

      }
      selectProduct(e:MatSelectionListChange){
        const selectedProducts = e.source.selectedOptions.selected
          .map(option => option.value as Product);
        const selectedIds = new Set(selectedProducts.map(product => product.id));
        const visibleIds = new Set(this.productData.map(product => product.id));
        const currentSelection = new Map(
          this.arrayProductSelect.map(product => [product.productId, product])
        );

        currentSelection.forEach((_, productId) => {
          if (visibleIds.has(productId!) && !selectedIds.has(productId!)) {
            currentSelection.delete(productId);
          }
        });

        selectedProducts.forEach(product => {
          if (!currentSelection.has(product.id)) {
            currentSelection.set(product.id, {
              name: product.name,
              productId: product.id,
              cant: 1,
              price: product.price,
              entryId: this.data.id,
              state: 0,
            });
          }
        });

        this.arrayProductSelect = Array.from(currentSelection.values());
      }

      isProductSelected(productId: string): boolean {
        return this.arrayProductSelect.some(product => product.productId === productId);
      }
  }
