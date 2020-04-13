import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number, isAlt: boolean) {
    let returnedValue = value.split(/[\.\(,\/\|]|[0-9]{2,4}(\s)?[Xx](\s)?[0-9]/g)[0];

    const hyphenPos = returnedValue.indexOf("-", returnedValue.indexOf("-") + 1);
    if (hyphenPos > -1) {
      returnedValue = returnedValue.slice(0, hyphenPos);
    }
    const commaPos = returnedValue.indexOf(",", returnedValue.indexOf(",") + 1);
    if (commaPos > -1) {
      returnedValue = returnedValue.slice(0, commaPos);
    }

    if (returnedValue.length > limit) {
      returnedValue = returnedValue.substr(0, limit).trim();
      returnedValue += isAlt ? '' : '...';
    }

    return returnedValue;
  }
}
