import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByDate'
})
export class SearchByDatePipe implements PipeTransform {

  transform(value: any, startDate: any,endDate:any,datefiltercheck:boolean,type): any {
    var checkDate
    if (!value || !datefiltercheck || !startDate || !endDate ) {
      return value;
    }
    else{
      return value.filter(values =>{
        if(values[type]){
          return new Date( values[type] ) >= startDate && new Date(values[type] ) <= endDate;
        }
      })
    }
  }
}