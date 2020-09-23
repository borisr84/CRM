import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityPipe'
})
export class QuantityPipe implements PipeTransform {

  transform(value: number): string {
    return `${value} units`;
  }

}
