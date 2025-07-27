import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { MAIN_ROUTES } from './features/main/main.routes';
import { AdminGuard } from './core/guards/admin.guard';

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
        path: '',
        children: MAIN_ROUTES,
    },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        children: ADMIN_ROUTES,
    }
];
