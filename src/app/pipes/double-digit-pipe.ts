import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doubleDigit',
  standalone: true
})
export class DoubleDigitPipe implements PipeTransform {

  transform(value: string | number): string {
    const num = typeof value === 'string' ? parseInt(value) : value;
    return num < 10 ? '0' + num : num.toString();
  }

}
