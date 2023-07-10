import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale("es");
@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  transform(value: any): String {
    
    return moment(value).format("D MMMM YYYY"); 
  }

}
