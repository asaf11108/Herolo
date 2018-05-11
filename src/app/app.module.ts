import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TitlePipe } from './home/title.pipe';
import { OrderByDatePipe } from './home/orderBy.pipe';
import { PageNotFound } from './page_not_found/page_not_found.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './services/book.service';
import { ModalModule } from 'ngx-bootstrap';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TitlePipe,
        OrderByDatePipe,
        PageNotFound,
        DetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, BooksService],
    bootstrap: [AppComponent]
})
export class AppModule { }