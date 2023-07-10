import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale("es");
@Pipe({
  name: 'hourString'
})
export class HourStringPipe implements PipeTransform {

  transform(value: any): string {
    return moment(value).format('LTS');;
  }

}
