import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/IBook';

@Pipe({
    name: 'titlePipe',
})
export class TitlePipe implements PipeTransform {

    constructor() { }

    transform(title: string): string {
        let words: string[] = title.split(" ");
        words.map(this.fixWord);
        return words.join(" ");
    }

    fixWord(word: string, index, words) {
        //remove any non-English letters
        word = word.replace(/[^a-zA-Z]/g,'');

        //first letter of each word upper cased and each other letter should be lowercased
        word = word.toLowerCase();
        words[index] = word.charAt(0).toUpperCase() + word.substr(1);

    }

}