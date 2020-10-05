import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateLevel'
})
export class DateLevelPipe implements PipeTransform {

  transform(value: any, date): any {
    const date1 = new Date(value);
    const level_date = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date.getDate();
    let time_am = date => {
      let hours = date.getHours();
      let minutes: any = date1.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    return level_date +''+ time_am(date1);
  }

}
