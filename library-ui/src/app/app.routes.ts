import { Routes } from '@angular/router';
import { BOOKS_ROUTE } from './features/books/books.route';
import { ADMIN_ROUTES } from './features/admin/admin.routes';

export const routes: Routes = [

    {
        path: 'books',
        children: BOOKS_ROUTE,
    },
    {
        path: 'admin',
        children: ADMIN_ROUTES,
    }
    
];
