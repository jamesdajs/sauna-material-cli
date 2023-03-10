import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
    private router:Router
    ) {

      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      });
     }
  ngOnInit(): void {
  }
  login(){
      
      this.authservice.login(this.loginForm.value)
      .subscribe({
        next: (res:any) => {
          this.cookieService.set("token",res.data.token)
          console.log(res);
        },
        error: (e) => {
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
}
