import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mutipleSearchMsl'
})
export class MutipleSearchMslPipe implements PipeTransform {

  transform(items: any[], branchId: any, name: any, region: any,product:any){
    let  check:boolean;
    var branchCheck:boolean = true;
    var nameCheck:boolean = true;
    var regioncheck:boolean= true;
    var productNameCheck:boolean= true;
    if (!branchId && !name && !region && !product  ) {
      return items;
    }
    if (items ){
      return items.filter(item =>{
        if (branchId  ){
          branchCheck = item.branch_id.toLowerCase().startsWith(branchId.toLowerCase());
        }
        if (name){
          nameCheck = item.branch_name.toLowerCase().startsWith( name.toLowerCase() );
        }
        if (region){
          regioncheck = item.region.toLowerCase().startsWith(region.toLowerCase());
        }
        if (product){
          productNameCheck = item.product_name.toLowerCase().startsWith(product.toLowerCase());
        }
        if(branchCheck && nameCheck && regioncheck && productNameCheck){
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
