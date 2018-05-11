import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Book } from '../interfaces/IBook';
import { BooksService } from '../services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})

export class DetailsComponent {
    book: Book;
    error: IError = new IError();
    fieldAlert: string = 'This field is required';
    formGroup: FormGroup;
    private isCreate: boolean;
    books: Book[];
    formTitle: string;

    constructor(private booksService: BooksService, private router: Router, private activatedRoute: ActivatedRoute) {
        let code: number = this.activatedRoute.snapshot.params['code'];
        this.booksService.cast.subscribe(dataSource => this.books = dataSource);
        this.isCreate = (code == 0);
        this.formTitle = this.isCreate ? "Create Book" : "Update Book";
        this.book = new Book("", "", "", "");
        if (!this.isCreate)
            this.book = this.books.filter(b => b.isbn === code.toString())[0];
        this.setFormGroup();
    }

    private setFormGroup() {
        this.formGroup = new FormGroup({
            isbn: new FormControl({ value: '', disabled: !this.isCreate }, {
                validators: [Validators.required, Validators.min(1)],
                updateOn: 'submit'
            }),
            title: new FormControl('', {
                validators: Validators.required,
                updateOn: 'submit'
            }),
            author: new FormControl('', {
                validators: Validators.required,
                updateOn: 'submit'
            }),
            published: new FormControl('', {
                validators: [Validators.required, dateValidator],
                updateOn: 'submit'
            })
        });

        function dateValidator(control: FormControl) {
            let date = control.value;
            let flag = moment().isAfter(date);
            if (!flag) {
                return {
                    dateCheck: {
                        nowAfterDate: flag
                    }
                }
            }
            return null;
        }
    }

    submitBook() {
        if (this.checkValidation())
            return;
        if (this.isCreate) {
            this.book.isbn = this.book.isbn.toString();
            this.booksService.addBook(this.book);
        }
        else {
            this.booksService.updateBook(this.book);
        }
        this.router.navigate(["/home"]);
    }

    private checkValidation(): boolean {
        if (this.isCreate)
            this.error.isbn = !this.formGroup.controls['isbn'].valid;
        this.error.title = !this.formGroup.controls['title'].valid;
        this.error.author = !this.formGroup.controls['author'].valid;
        this.error.published = !this.formGroup.controls['published'].valid;
        return !this.formGroup.valid;
    }
}

class IError {
    constructor(
        public isbn: boolean = false,
        public title: boolean = false,
        public author: boolean = false,
        public published: boolean = false,
    ) { }
}
