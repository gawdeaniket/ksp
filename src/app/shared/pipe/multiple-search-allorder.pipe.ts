import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multipleSearchAllorder'
})
export class MultipleSearchAllorderPipe implements PipeTransform {

  transform(items: any[], invoiceId: any, productName: any, customerName: any,customerPhone:any,customerAddress:any,status:any,ReceivedDate:any,disbursalDate:any){
    let  check:boolean;
    var productNameCheck:boolean= true;
    var invoiceIdCheck:boolean = true;
    var customerNamecheck:boolean = true;
    var cutomerAddressCheck:boolean = true;
    var  statusCheck:boolean = true;
    var  ReceivedDateCheck:boolean = true;
    var disbursalDateCheck:boolean = true;
    var customerPhonecheck:boolean = true;
    if (!invoiceId && !productName && !customerName &&!customerPhone && !customerAddress &&!status && !ReceivedDate && !disbursalDate) {
      return items;
    }
    if (items ){
      return items.filter(item =>{
        if (invoiceId){
          if(item.invoice_id == null || item.invoice_id == undefined ){
            invoiceIdCheck = false;
          }else{
            invoiceIdCheck = item.invoice_id.toLowerCase().startsWith(invoiceId.toLowerCase());
          }
        }
        if (productName){
          productNameCheck = item.product_name.toLowerCase().startsWith( productName.toLowerCase() );
        }
        if (customerName){
          customerNamecheck = item.customer_name.toLowerCase().startsWith(customerName.toLowerCase());
        }
        if (customerPhone){
          customerPhonecheck = item.phone_number.startsWith(customerPhone);
        }
        if (customerAddress){
          cutomerAddressCheck = item.address.toLowerCase().indexOf(customerAddress.toLowerCase()) >-1;
        }
        if (status){
          statusCheck = item.status.toLowerCase().startsWith(status.toLowerCase());
        }
        if (ReceivedDate){
          ReceivedDateCheck = item.order_date.toLowerCase().startsWith(ReceivedDate.toLowerCase());
        }
        if (disbursalDate){
          disbursalDateCheck = item.disbursal_date.toLowerCase().startsWith(disbursalDate.toLowerCase());
        }
        if(invoiceIdCheck &&
           customerNamecheck &&
           customerPhonecheck && 
           cutomerAddressCheck && 
           productNameCheck && 
           statusCheck && 
           ReceivedDateCheck && 
           disbursalDateCheck){
              check = true;
          }else{
              check = false;
          }
            return check;
      })
    }
    else{
      return items;
    }
}

}
