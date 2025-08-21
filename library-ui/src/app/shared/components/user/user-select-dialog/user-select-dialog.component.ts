import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../../../core/models/user/user.model';
import { UserService } from '../../../../core/services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { CreateBorrow } from '../../../../core/models/borrow/create-borrow.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-select-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './user-select-dialog.component.html',
  styleUrls: ['./user-select-dialog.component.css']
})
export class UserSelectDialogComponent implements OnInit {

  users: User[] = [];
  borrow!: CreateBorrow;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems?: number;
  searchKey?: string = '';

  constructor(private userService: UserService, private dialogRef: MatDialogRef<UserSelectDialogComponent>) { }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getAllUsers(this.pageIndex, this.itemsPerPage, this.searchKey).subscribe({

      next: (res) => {

        this.users = res.data ?? [];

        this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
        this.totalItems = Number(res.pagination?.totalItems)
        this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10)
      },
      error: (err) => {
        console.error("Error: ", err.error.message);
      }
    });
  }

  selectUser(user: any) {

    this.dialogRef.close(user);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadUsers();
  }
}
