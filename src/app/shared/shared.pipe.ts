import { Pipe, PipeTransform } from '@angular/core';
 

@Pipe({ name: 'dictionaryName' })
export class DictionaryPipe implements PipeTransform {
    transform(value: number, type: string): string {
        return "";
    }
}