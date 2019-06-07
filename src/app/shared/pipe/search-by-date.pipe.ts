import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByDate'
})
export class SearchByDatePipe implements PipeTransform {

  transform(value: any, startDate: any,endDate:any,datefiltercheck:boolean,type): any {
    startDate:endDate:datefiltercheck :'order_date'
   // // console.log(event);
   
  //  // console.log(typeof this.date[0]);
      // console.log(value);
      // console.log(startDate);
      // console.log(endDate);
      // console.log(datefiltercheck);
      // console.log(type);
   var checkDate

    if (!value || !datefiltercheck || !startDate || !endDate ) {
      // console.log("invalid");
            return value;
        }
        else{
          let start = startDate.toISOString();
          let end = endDate.toISOString();
          
         
        return value.filter(values =>{
          // console.log(new Date( values[type]) );
          // console.log(new Date( values[type]) > startDate);
          if(values[type]){
            // console.log(  new Date(values[type]) < endDate)
         return    new Date( values[type] ) >= startDate && new Date(values[type] ) <= endDate;
          }

        })
         
        }

}
}