import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { ServiceService } from 'src/app/services/service.service';
import { ErrorFormService } from 'src/app/services/errorForm.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {
  loginForm:FormGroup
  constructor(
    private serviceService:ServiceService,
    private formBuilder:FormBuilder,
    private router:Router,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    ) {

      this.loginForm = this.formBuilder.group({
        name: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
        price: ['',[Validators.required,Validators.min(10),Validators.max(100),Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
        type: ['',[Validators.required]],
        description:['']
      });
     }
     
  ngOnInit(): void {
  }
  create(){
    this.serviceService.create(this.loginForm.value)
    .subscribe({
      
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.openAlertDialog()
      },
    });
  }
  validar(text:string,name:string){
    return this.errorform.validar(text,name,this.loginForm)
  }
  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: {title: "Sauna Florida", message: "Se creo el servicio correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(["/services"])
    });
  }
  back(){
    this.router.navigate(["/services"])
  }
}
