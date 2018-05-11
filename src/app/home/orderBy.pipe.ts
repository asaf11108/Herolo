import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/IBook';

@Pipe({
    name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
    constructor() { }

    transform(array: Book[], field: string): Book[] {
        // if (array === undefined)
        //     return array;
        // array.sort((a: Driver, b: Driver) => {
        //     let timeA = this.utilService.callDiffDays(a[field]);
        //     let timeB = this.utilService.callDiffDays(b[field]);
        //     if (timeA < timeB) {
        //         return 1;
        //     } else if (timeA > timeB) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // });
        return array;
    }
}