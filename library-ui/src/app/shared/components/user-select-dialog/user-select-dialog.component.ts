import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../../core/models/user/user.model';
import { UserService } from '../../../core/services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { BorrowService } from '../../../core/services/borrow/borrow.service';
import { CreateBorrow } from '../../../core/models/borrow/create-borrow.model';

@Component({
  selector: 'app-user-select-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './user-select-dialog.component.html',
  styleUrls: ['./user-select-dialog.component.css']
})
export class UserSelectDialogComponent implements OnInit {

  users: User[] = [];
  borrow!: CreateBorrow;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  isLoading = false;

  @Output() userSelected = new EventEmitter<User>();

  constructor(private userService: UserService, private dialogRef: MatDialogRef<UserSelectDialogComponent>) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {

    this.isLoading = true;

    this.userService.getAllUsers().subscribe({

      next: res => {

        this.users = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  selectUser(user: any) {

    this.dialogRef.close(user);
  }
}
