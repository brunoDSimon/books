import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ 
    name: 'reais'
})
export class ReaisPipe implements PipeTransform {
    transform(value: number,
    currencySign: string = 'R$ ',
    decimalLength: number = 2,
    chunkDelimiter: string = '.',
    decimalDelimiter: string = ',',
    chunkLength: number = 3): string {
        
    value = Number(value);
    if (isNaN(value)) {
        value = 0;
    }
    const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    const num = value.toFixed(Math.max(0, ~~decimalLength));
    return currencySign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    }
}   