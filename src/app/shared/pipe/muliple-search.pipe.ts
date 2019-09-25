import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mulipleSearch'
})
export class MulipleSearchPipe implements PipeTransform {


   transform(items: any[], branchId: any, name: any, region: any,product:any,state:any){
    let  check:boolean;
    var branchCheck:boolean = true;
    var nameCheck:boolean = true;
    var regioncheck:boolean= true;
    var productNameCheck:boolean= true;
    var statecheck:boolean = true

  console.log(items);
// console.log(branchId);
// console.log(name);
    if (!branchId && !name && !region && !product && !state  ) {
      // console.log("empty");
      return items;
  }
    if (items ){
        return items.filter(item =>{
            
          
       
            if (branchId  ){
                 branchCheck = item.branch_id.toLowerCase().startsWith(branchId.toLowerCase());
                 // console.log(check);
            }         
            if (name  ){
              nameCheck = item.branch_name.toLowerCase().startsWith( name.toLowerCase() );
              // console.log(check);
              
            }
            if (region   ){
              regioncheck = item.region.toLowerCase().startsWith(region.toLowerCase());
              // console.log(check);
            }
            if (product){
               productNameCheck = item.state.toLowerCase().startsWith(product.toLowerCase());
               // console.log("product name "+productNameCheck);
          }
          if (state  ){
            // console.log(item.state);
            statecheck = item.status.toLowerCase().startsWith(state.toLowerCase());
            // console.log(check);
          }
           
          if(branchCheck && nameCheck && regioncheck && productNameCheck && statecheck){
          check = true;
          }else{
            check = false;
          }

        //   if (quantity != item.product_quantity){
        //     check = false;
        //     // console.log(check);
        // }
          // console.log(check);
            return check;
            
       })
    }
    else{
        return items;
    }
}

}
