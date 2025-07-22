import { Routes } from '@angular/router';
import { UserCreateComponent } from './user/create/user-create/user-create.component';
import { UserDetailComponent } from './user/detail/user-detail/user-detail.component';
import { UserEditComponent } from './user/edit/user-edit/user-edit.component';
import { BookCreateComponent } from './books/create/book-create/book-create.component';
import { BookEditComponent } from './books/edit/book-edit/book-edit.component';
import { BookDetailComponent } from '../books/detail/book-detail.component';
import { BooksListComponent } from '../books/list/books-list.component';
import { UserListComponent } from './user/list/user-list/user-list.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'users',
        children: [
            {
                path: '',
                component: UserListComponent,
            },
            {
                path: 'create',
                component: UserCreateComponent,
            },
            {
                path: 'edit/:id',
                component: UserEditComponent,
            },
            {
                path: ':id',
                component: UserDetailComponent,
            }
        ]
    },
    {
        path: 'books',
        children: [
            {
                path: '',
                component: BooksListComponent
            },
            {
                path: 'create',
                component: BookCreateComponent,
            },
            {
                path: 'edit/:id',
                component: BookEditComponent,
            },
            {
                path: ':id',
                component: BookDetailComponent,
            }
        ]
    }
];
