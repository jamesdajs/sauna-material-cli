
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorFormService {
    variable: AbstractControl
    errors :ValidationErrors
    text = ""
    message = ""
  constructor() { }
  validar(text: string,name:string,form:FormGroup){
    this.text = text
    this.variable = form.get(name) as AbstractControl
    this.errors =form.controls[name].errors as ValidationErrors
    this.actualizar()
    return this.message
  }
  private actualizar() {
    let error = this.errors
    if (error) {
      let key = Object.keys(error)[0]
      //console.log({key});
      
      switch (key) {
        case "required": {
          this.message = `${this.text} es requerido(a).`
          break
        }
        case "minlength": {
          let err = error['minlength']
         // console.log(err);
          
          this.message = `${this.text} tienen que contener al menos ${err.requiredLength} caracteres.`
          break
        }
        case "maxlength": {
          let err = error['maxlength']
          this.message = `${this.text} no tiene que ser mayor a ${err.requiredLength} caracteres.`
          break
        }
        case "pattern": {
          this.message = `${this.text} no es valido.`
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
        case "min": {
          let err = error['min']
          this.message = `el valor minimo es ${err.min}`
          break
        }
        case "max": {
          let err = error['max']
          this.message = `el valor maximo es ${err.max}`
          break
        }
      }
    }
  }
}