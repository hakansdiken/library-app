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


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['userName', 'userEmail', 'userRole', 'actions'];
  isLoading = false;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.loadUsers();
  }

  loadUsers() {

    this.isLoading = true;

    this.userService.getAllUsers().subscribe({

      next: (res) => {

        this.users = res.data ?? [];
        this.isLoading = false;
      },
      error: () => {

        this.isLoading = false;
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

        console.error("Error:" + err.message)
      }
    });
  }
}
