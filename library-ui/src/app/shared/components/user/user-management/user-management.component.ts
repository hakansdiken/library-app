import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../../core/models/user/user.model';
import { UserService } from '../../../../core/services/user/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from '../../delete-component/delete-item.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarUtil } from '../../../utils/snackbar-util';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['userName', 'userEmail', 'userRole', 'actions'];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems?: number;

  searchKey?: string = '';
  currentUser?: User | null;
  // totalPages?: number;
  // hasPrevPage?: boolean = false;
  // hasNextPage?: boolean = false;


  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog, private router: Router, private snackbarUtil: SnackbarUtil) { }

  ngOnInit(): void {

    this.currentUser = this.authService.getUser();
    this.pageIndex = 0;
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getAllUsers(this.pageIndex, this.itemsPerPage, this.searchKey).subscribe({

      next: (res) => {

        this.users = res.data ?? [];

        this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
        this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10);
        this.totalItems = Number(res.pagination?.totalItems);
      },
      error: (err) => {
        console.error(err.error?.message)
      }
    });
  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loadUsers();
      }
    });
  }
  openEditDialog(user: User) {

    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      data: { mode: 'edit', user: user }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadUsers();
      }
    });
  }

  deleteUser(userId: string): void {

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.snackbarUtil.showSuccess('🎉 User deleted successfully!')

        this.loadUsers();
      },
      error: (err) => {

        this.snackbarUtil.showError('❌ An error occurred while deleting user!')

        console.error("Error: " + err.error?.message)
      }
    });
  }

  goToBorrowHistory(userId: string) {
    const currentUrl = this.router.url;  // mevcut url path + querystring
    const isAdminRoute = currentUrl.startsWith('/admin');

    if (isAdminRoute) {
      this.router.navigate(['/admin/borrows'], { queryParams: { userId } });
    } else {
      this.router.navigate(['/borrows'], { queryParams: { userId } });
    }
  }

  openDeleteDialog(user: User) {

    if (!user.canBeDeleted) {
      this.snackbarUtil.showWarning('⚠️ This user cannot be deleted because has book!')

      return;
    }

    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '400px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.name} ${user.surname}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.deleteUser(user.id);
      }
    })
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadUsers();
  }
}
