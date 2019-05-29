import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multipleSearchAllorder'
})
export class MultipleSearchAllorderPipe implements PipeTransform {

 

  transform(items: any[], invoiceId: any, productName: any, customerName: any,customerPhone:any,customerAddress:any,status:any,ReceivedDate:any,disbursalDate:any){
    let  check:boolean;
   
console.log(invoiceId +" "+productName +" "+customerName +" "+customerAddress+" "+customerPhone);


    var productNameCheck:boolean= true;
    var invoiceIdCheck:boolean = true;
    var customerNamecheck:boolean = true;
    var cutomerAddressCheck:boolean = true;
    var  statusCheck:boolean = true;
    var  ReceivedDateCheck:boolean = true;
    var disbursalDateCheck:boolean = true;
    var customerPhonecheck:boolean = true;


    if (!invoiceId && !productName && !customerName &&!customerPhone && !customerAddress &&!status && !ReceivedDate && !disbursalDate) {
      console.log("empty");
      return items;
  }
    if (items ){
        return items.filter(item =>{
            
          
       
            if (invoiceId ){
              invoiceIdCheck = item.invoice_id.toLowerCase().startsWith(invoiceId.toLowerCase());
              //   console.log(check);
            }         
            if (productName  ){
              productNameCheck = item.product_name.toLowerCase().startsWith( productName.toLowerCase() );
           //   console.log(check);
              
            }
            if (customerName  ){
              customerNamecheck = item.customer_name.toLowerCase().startsWith(customerName.toLowerCase());
             // console.log(check);
            }
            if (customerPhone  ){
              customerPhonecheck = item.phone_number.startsWith(customerPhone);
              console.log(customerPhonecheck);
            }
            if (customerAddress){
              cutomerAddressCheck = item.customer_address.toLowerCase().startsWith(customerAddress.toLowerCase());
           //    console.log("product name "+productNameCheck);
          }
          if (status){
            statusCheck = item.status.toLowerCase().startsWith(status.toLowerCase());
          //   console.log("product name "+productNameCheck);
        }
        if (ReceivedDate){
          ReceivedDateCheck = item.order_date.toLowerCase().startsWith(ReceivedDate.toLowerCase());
        //   console.log("product name "+productNameCheck);
      }
      if (disbursalDate){
        disbursalDateCheck = item.disbursal_date.toLowerCase().startsWith(disbursalDate.toLowerCase());
      //   console.log("product name "+productNameCheck);
    }
           
          if(invoiceIdCheck && customerNamecheck &&customerPhonecheck && cutomerAddressCheck && productNameCheck && statusCheck && ReceivedDateCheck && disbursalDateCheck){
          check = true;
          }else{
            check = false;
          }

        //   if (quantity != item.product_quantity){
        //     check = false;
        //     console.log(check);
        // }
          console.log(check);
            return check;
            
       })
    }
    else{
        return items;
    }
}

}
