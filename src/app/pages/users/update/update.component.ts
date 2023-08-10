import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { Role } from 'src/app/interfaces/Role';
import { ErrorFormService } from 'src/app/services/errorForm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  loginForm: FormGroup
  role: Role[]
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
        console.log(params.get('roleId'));
        this.id = parseInt(params.get('id')!)
        
        this.loginForm = this.formBuilder.group({
          name: [params.get('name'), [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
          ci: [params.get('ci'), [Validators.required]],
          phone: [params.get('phone'), [Validators.required,Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^([0-9])*$/)]],
          gender: [params.get('gender'), [Validators.required]],
          role:[parseInt(params.get('roleId')!), [Validators.required]],
          birthdate: [params.get('birthdate'), [Validators.required]],
          observation: [params.get('observation')]
        });
      })
  
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
  validar(text: string, name: string) {
    return this.errorform.validar(text, name, this.loginForm)
  }
  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: { title: "Sauna Florida", message: `Se modifico el usuario  correctamente` },
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
    this.userService.update(this.id,this.loginForm.value)
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
