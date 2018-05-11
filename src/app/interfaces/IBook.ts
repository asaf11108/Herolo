export class Book {
    public isbn: string;
    public title: string;
    public author: string;
    public published: string;

    constructor(
        isbn: string,
        title: string,
        author: string,
        published:string,
    ) {
       this.isbn = isbn;
       this.title = title;
       this.author = author;
       this.published = published;
    }
}
