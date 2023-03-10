import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorFormService } from 'src/app/services/errorForm.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent {
  loginForm:FormGroup 
  id:string
  constructor(
    private route: ActivatedRoute,
    private customerService:CustomerService,
    private formBuilder:FormBuilder,

    private router:Router,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    
    ){
      this.route.paramMap.subscribe(
        params =>{
          this.id = params.get('id')!;
          this.loginForm = this.formBuilder.group({
            name: [params.get('name'), [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
            ci: [params.get('ci')],
            phone: [params.get('phone')],
            gender: [params.get('gender'),[Validators.required]],
            observation:[params.get('observation')]
          });
        }
      );
     
    this.route.queryParams.subscribe(params => {
      
      
    });
  }
  update(){
    this.customerService.update(this.id,this.loginForm.value)
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
      data: {title: "Sauna Florida", message: "Se modifico el cliente correctamente"},
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
