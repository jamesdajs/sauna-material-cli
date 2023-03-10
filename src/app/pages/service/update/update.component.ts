import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { ErrorFormService } from 'src/app/services/errorForm.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent {
  id: string
  loginForm:FormGroup
  constructor(
    private serviceService:ServiceService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.id= params.get('id')!
          this.loginForm = this.formBuilder.group({
            name: [params.get('name'), [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
            price: [params.get('price'),[Validators.required,Validators.min(10),Validators.max(100),Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
            type: [params.get('type'),[Validators.required]],
            description:[params.get('description')]
          });
        })
     }
     
  ngOnInit(): void {
  }
  update(){
    this.serviceService.update(this.id,this.loginForm.value)
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
      data: {title: "Sauna Florida", message: "Se modifico el servicio correctamente"},
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
