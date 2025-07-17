import { Routes } from "@angular/router";
import { BooksListComponent } from "./list/books-list/books-list.component";
import { BookDetailComponent } from "./detail/book-detail/book-detail.component";

export const BOOKS_ROUTE: Routes = [
    {
        path: '',
        component: BooksListComponent
    },
    {
        path: ':id',
        component: BookDetailComponent
    },
    
]