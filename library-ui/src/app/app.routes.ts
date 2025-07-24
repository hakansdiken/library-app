import { Routes } from '@angular/router';
import { BOOKS_ROUTE } from './features/books/books.route';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BORROWS_ROUTE } from './features/borrows/borrows.route';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        children: AUTH_ROUTES,
    },
    {
        path: 'books',
        children: BOOKS_ROUTE,
    },
    {
        path: 'borrows',
        children: BORROWS_ROUTE,
    },
    {
        path: 'admin',
        children: ADMIN_ROUTES,
    }
];
