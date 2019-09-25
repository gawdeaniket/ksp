import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoicesearch'
})
export class InvoicesearchPipe implements PipeTransform {

  transform(employees, searchTerm: string): any {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter(employee =>
      employee.invoice_id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

  }
