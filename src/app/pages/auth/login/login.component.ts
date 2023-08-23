import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  hide = true;
  constructor(
    private authservice:AuthService,
    private formBuilder:FormBuilder,
    private cookieService:CookieService,
    private router:Router,
    private dialog: MatDialog,
    
    private navService:NavService
    ) {

      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      });
     }
  ngOnInit(): void {
  }
  login(){
      console.log(this.loginForm.value)
      this.authservice.login(this.loginForm.value)
      .subscribe({
        next: (res:any) => {
          this.cookieService.set("token",res.data.token)
          this.navService.setUser(res.data.user)
          console.log(res);
        },
        error: (e) => {
          this.openAlertDialog(e.error.message);
          console.log(e);
        },
        complete: () => {
          this.router.navigate(["/customers"])
          console.log('done')
        },
      });
    }
    formError(name:string){
      return this.loginForm.controls[name].errors as ValidationErrors
    }
    openAlertDialog(msg:string): void {
      const dialogRef = this.dialog.open(AlertDialog, {
        data: {title: "Sauna Florida", message: msg},
      });
  
      dialogRef.afterClosed().subscribe(_ => {
        console.log('The dialog was closed');
      });
    }
}
