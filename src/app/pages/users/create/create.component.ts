import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { Role } from 'src/app/interfaces/Role';
import { ErrorFormService } from 'src/app/services/errorForm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  loginForm: FormGroup
  role: Role[]
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorform: ErrorFormService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      ci: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^([0-9])*$/)]],
      gender: ['', [Validators.required]],
      role:['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

      observation: ['']
    });
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.userService.getRole().subscribe({
      next: (res) => {
        console.log(res);
        this.role = res
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {

      },
    })
  }
  create() {
    console.log(this.loginForm.value)
    this.userService.create(this.loginForm.value)
      .subscribe({

        error: (e) => {
          console.log(e);
          this._snackBar.open(e.error.message, "ok")
        },
        complete: () => {
          this.openAlertDialog()
        },
      });
  }
  validar(text: string, name: string) {
    return this.errorform.validar(text, name, this.loginForm)
  }
  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: { title: "Sauna Florida", message: `Se creo el usuario  correctamente` },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(["/users"])
    });
  }
  back() {
    this.router.navigate(["/users"])
  }
}
