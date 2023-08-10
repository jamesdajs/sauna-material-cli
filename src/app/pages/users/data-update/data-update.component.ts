import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { ErrorFormService } from 'src/app/services/errorForm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-data-update',
  templateUrl: './data-update.component.html',
  styleUrls: ['./data-update.component.scss']
})
export class DataUpdateComponent {
  loginForm: FormGroup
  id: number
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorform: ErrorFormService,
    private dialog: MatDialog,
    private route:ActivatedRoute
  ) {
    this.route.paramMap.subscribe(
      params =>{
        this.id = parseInt(params.get('id')!)
        this.loginForm = this.formBuilder.group({
          username: params.get('username'),
          password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        });
        this.loginForm .get('username')?.disable();
      })
    }

    validar(text: string, name: string) {
      return this.errorform.validar(text, name, this.loginForm)
    }
    openAlertDialog(): void {
      const dialogRef = this.dialog.open(AlertDialog, {
        data: { title: "Sauna Florida", message: `Se modifico la contraseña  correctamente` },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.router.navigate(["/users"])
      });
    }
    back() {
      this.router.navigate(["/users"])
    }
    update() {
      console.log(this.loginForm.value)
      this.userService.updateData(this.id,this.loginForm.value)
        .subscribe({
    
          error: (e) => {
            console.log(e);
          },
          complete: () => {
            this.openAlertDialog()
          },
        });
    }
}
