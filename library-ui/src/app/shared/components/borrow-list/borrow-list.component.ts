import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Borrow } from '../../../core/models/borrow/borrow';
import { UserRole } from '../../../core/models/enums/user-role.enum';
import { AuthService } from '../../../core/services/auth/auth.service';
import { BorrowService } from '../../../core/services/borrow/borrow.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-borrow-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})
export class BorrowListComponent implements OnInit {

  borrows: Borrow[] = [];
  displayedColumns: string[] = ['userName', 'userEmail', 'bookTitle', 'status', 'borrowDate', 'returnDate'];

  constructor(private borrowService: BorrowService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadBorrows();
  }

  loadBorrows() {
    const user = this.authService.getUser();

    if (!user) {

      this.borrows = [];
      return;
    }

    const { role, id: userId } = user;

    if (role === UserRole.Librarian || role === UserRole.Admin) {

      if (!this.displayedColumns.includes('actions')) {

        this.displayedColumns = [...this.displayedColumns, 'actions'];
      }

      this.borrowService.getBorrows().subscribe({
        next: borrowRes => {
          this.borrows = borrowRes.data ?? [];
        },
        error: err => {
          console.error('Error: ', err);
        }
      });

    } else if (role === UserRole.Member && userId) {

      this.borrowService.getBorrowsByUser(userId).subscribe({
        next: borrowRes => {
          this.borrows = borrowRes.data ?? [];
        },
        error: err => {
          console.error('Error: ', err);
        }
      });

    } else {
      this.borrows = [];
    }
  }

  markAsReturned(borrowId: string) {
    this.borrowService.markReturned(borrowId).subscribe({
      next: res => {
        this.loadBorrows();
      },
      error: err => {
        console.error("Error: ", err.error.message);
      }
    });
  }
}
