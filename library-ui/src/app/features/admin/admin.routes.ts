import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserManagementComponent } from './users/user-management/user-management.component';
import { BookManagementComponent } from './books/book-management/book-management.component';
import { BorrowListComponent } from '../../shared/components/borrow-list/borrow-list.component';
import { AdminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UserManagementComponent },
      { path: 'books', component: BookManagementComponent },
      { path: 'borrows', component: BorrowListComponent }
    ]
  }
];
