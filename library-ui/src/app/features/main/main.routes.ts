import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BooksListComponent } from './books/list/books-list.component';
import { BorrowListComponent } from './borrows/borrow-list/borrow-list.component';

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'books', pathMatch: 'full' },
            { path: 'books', component: BooksListComponent },
            { path: 'borrows', component: BorrowListComponent },

        ]
    }
];
