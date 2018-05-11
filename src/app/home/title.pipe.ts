import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/IBook';

@Pipe({
    name: 'titlePipe',
})
export class TitlePipe implements PipeTransform {

    constructor() { }

    transform(title: string): string {
        for(let i = 0; i < title.length; i++){
        }
        return title;
    }

}