import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { ErrorFormService } from 'src/app/services/errorForm.service';
import { LockerService } from 'src/app/services/locker.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent {
  loginForm:FormGroup
  id:string
  constructor(
    private lockerService:LockerService,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private errorform:ErrorFormService,
    private dialog: MatDialog
    ) {

      this.route.paramMap.subscribe(
        params =>{
          this.id = params.get('id')!;

          this.loginForm = this.formBuilder.group({
            code: [params.get('code'),[Validators.required,Validators.minLength(1),Validators.maxLength(3),Validators.pattern(/^([0-9])*$/)]],
            type: [params.get('type'),[Validators.required]],
            observation:[params.get('observation')]
          });
        })
     }
     
  ngOnInit(): void {
  }
  create(){
    this.lockerService.update(this.id,this.loginForm.value)
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
      data: {title: "Sauna Florida", message: "Se Modifico el casillero correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(["/lockers"])
    });
  }
  back(){
    this.router.navigate(["/lockers"])
  }
}
