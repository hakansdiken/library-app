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


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['userName', 'userEmail', 'userRole', 'actions'];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  // totalPages?: number;
  // hasPrevPage?: boolean = false;
  // hasNextPage?: boolean = false;
  totalItems?: number;


  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getAllUsers(this.pageIndex, this.itemsPerPage).subscribe({

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

        this.loadUsers();
      },
      error: (err) => {

        console.error("Error:" + err.error?.message)
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadUsers();
  }
}
