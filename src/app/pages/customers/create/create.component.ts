import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { EntryService } from 'src/app/services/entry.service';
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
    private entryService: EntryService
    
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
      next: (customer) => {
        this.entryService.create({customerId: customer.id})
        .subscribe({
          next: (entry) => {
            this.router.navigate(["/entries/details", {id: entry.id}]);
          },
          error: (e) => console.log(e)
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  validar(text:string,name:string){
    return this.errorform.validar(text,name,this.loginForm)
  }
  back(){
    this.router.navigate(["/customers"])
  }
}
