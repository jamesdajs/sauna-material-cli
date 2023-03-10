import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnChanges  {
  @Input() variable: AbstractControl  
  @Input() errors :ValidationErrors
  @Input() nombre = ""
  message = ""
  constructor(private formBuilder:FormBuilder) { 
    this.variable = this.formBuilder.control("")
    this.errors = this.variable.errors as ValidationErrors
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['errors']){
      this.errors = change['errors']['currentValue']
      this.actualizar()
    }
  }
  actualizar() {
    let error = this.errors
    if (error) {
      let key = Object.keys(error)[0]
      console.log({key});
      
      switch (key) {
        case "required": {
          this.message = `${this.nombre} es requerido(a).`
          break
        }
        case "minlength": {
          let err = error['minlength']
          console.log(err);
          
          this.message = `${this.nombre} tienen que contener al menos ${err.requiredLength} caracteres.`
          break
        }
        case "maxlength": {
          let err = error['maxlength']
          this.message = `${this.nombre} no tiene que ser mayor a ${err.requiredLength} caracteres.`
          break
        }
        case "pattern": {
          this.message = `${this.nombre} no es valido.`
          break
        }
        case "email": {
          this.message = `No es un correo electronico valido.`
          break
        }
        case "notEquals": {
          this.message = `Las contraseñas no coinsiden.`
          break
        }
      }
    }
  }
}
