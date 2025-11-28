import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Entry } from "src/app/interfaces/entry";
import { Locker } from "src/app/interfaces/locker";
import { Service } from "src/app/interfaces/service";
import { DetailService } from "src/app/services/detail.service";
import { ErrorFormService } from "src/app/services/errorForm.service";
import { LockerService } from "src/app/services/locker.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
    selector: 'detail-dialog',
    templateUrl: './detail.dialog.html',
    styleUrls: ['./detail.dialog.sass']
  })
  //customer
  export class DetailDialog implements OnInit {
    loginForm:FormGroup
    lockerData:[Locker]
    serviceData:[Service]
    serviceSelect:Service
    lokerSelect:Locker[]
    constructor(
      public dialogRef: MatDialogRef<DetailDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Entry,
      private lockerService:LockerService,
      private serviceService:ServiceService,
      private detailService:DetailService,
      private formBuilder:FormBuilder,
      private errorform:ErrorFormService
    ) {
        this.loginForm = this.formBuilder.group({
            cant: ['', [Validators.required,Validators.min(1),Validators.max(20)]],
            price: [''],
            serviceId: ['',[Validators.required]],
            lockerId: [''],
          });
    }
    ngOnInit() {
      this.lockerService.list("/list/false")
      .subscribe(data => {
        console.log(data);
        data.sort((a, b) => {
        const numStringA = a.code.match(/\d+/);
        const numStringB = b.code.match(/\d+/);

        // 2. Convertir los strings a números enteros (ej: 10)
        const numA = numStringA ? parseInt(numStringA[0], 10) : 0;
        const numB = numStringB ? parseInt(numStringB[0], 10) : 0;

        // 3. Comparar numéricamente (ascendente)
        return numA - numB;
      });
        this.lockerData=data
      })
      this.serviceService.list("/list/true")
      .subscribe(data => {
        console.log(data);
        this.serviceData = data;
      })
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    create(): void {
      let data = this.loginForm.value
      data.price = this.serviceSelect.price
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
      onChange(e:any){

        let service =this.serviceData.find(data => data.id==e.value)
        console.log(e,service);
        this.serviceSelect = service!
      }
      onChangeLocker(e:any){

        let service =this.lockerData.filter(data => e.value.includes(data.id))
        console.log(e,service);
        this.lokerSelect = service!
      }
  }
