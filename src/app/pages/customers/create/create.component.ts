import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorFormService } from 'src/app/services/errorForm.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  loginForm:FormGroup
  searchName = ''
  constructor(
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.searchName = params.get('name')!;
        }
      );
      this.loginForm = this.formBuilder.group({
        name: [this.searchName, [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
        ci: [''],
        phone: ['',[Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^([0-9])*$/)]],
        gender: ['',[Validators.required]],
        observation:['']
      });
     }
     
  ngOnInit(): void {
  }
  create(){
    this.customerService.create(this.loginForm.value)
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
      data: {title: "Sauna Florida", message: "Se creo el cliente correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(["/customers"])
    });
  }
  back(){
    this.router.navigate(["/customers"])
  }
}
