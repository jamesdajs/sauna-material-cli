import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorFormService } from 'src/app/services/errorForm.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {
  loginForm:FormGroup
  constructor(
    private categoryService:CategoryService,
    private formBuilder:FormBuilder,
    private router:Router,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    ) {

      this.loginForm = this.formBuilder.group({
        name: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
      });
     }
     
  ngOnInit(): void {
  }
  create(){
    this.categoryService.create(this.loginForm.value)
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
      data: {title: "Sauna Florida", message: "Se creo la categoria correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(["/categories"])
    });
  }
  back(){
    this.router.navigate(["/categories"])
  }
}
