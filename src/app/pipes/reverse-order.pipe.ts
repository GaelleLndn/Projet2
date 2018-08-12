import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseOrder'
})
export class ReverseOrderPipe implements PipeTransform {

  transform(value) {
    if (!value) return;

    return value.reverse();
  }

}
