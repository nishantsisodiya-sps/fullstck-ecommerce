import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConvert'
})
export class PipePipe implements PipeTransform {

  transform(value: number,){
    let dollar = 80
    let price = value * dollar
    return price
  }

}
