import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BookDetailComponent } from './books/detail/book-detail.component';
import { BooksListComponent } from './books/list/books-list.component';
import { ProfileComponent } from './profile/profile.component';
import { BorrowContainerComponent } from '../../shared/components/borrow/borrow-container/borrow-container.component';

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'books', pathMatch: 'full' },
            { path: 'books', component: BooksListComponent },
            { path: 'books/:id', component: BookDetailComponent },
            { path: 'borrows', component: BorrowContainerComponent },
            { path: 'profile', component: ProfileComponent }
        ]
    }
];
