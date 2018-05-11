import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Book } from '../interfaces/IBook';
import { BooksService } from '../services/book.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    books: Book[];
    public deleteBook: Book;
    modalRef: BsModalRef;
    message: string;


    constructor(private booksService: BooksService, private modalService: BsModalService) {
    }

    ngOnInit() {
        this.booksService.cast.subscribe(dataSource => this.books = dataSource);
    }

    openModal(template: TemplateRef<any>, row:Book) {
        this.deleteBook = row;
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(): void {
        this.booksService.deleteBook(this.deleteBook.isbn);
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

}
