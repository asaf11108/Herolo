import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Book } from '../interfaces/IBook';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BooksService {
    books: Book[];

    private booksSource = new BehaviorSubject<Book[]>(this.books);
    cast = this.booksSource.asObservable();

    constructor(private http: HttpClient) {
        this.http.get<Book[]>("http://localhost:8080/books.json").subscribe(result => {
            this.books = result.map(book => new Book(book.isbn, book.title, book.author, book.published));
            this.booksSource.next(this.books);
        },
            error => console.log(error));
    }

    getBooks() {
        return this.books;
    }

    addBook(book: Book) {
        this.books.push(book);
        this.booksSource.next(this.books);
    }

    deleteBook(isbn: string) {
        this.books = this.books.filter((b: Book) => b.isbn !== isbn);
        this.booksSource.next(this.books);
    }

    updateBook(book: Book) {
        this.books.forEach((item, index) => {
            if(item.isbn == book.isbn)
                this.books[index] = book;
        })
        this.booksSource.next(this.books);
    }

}
