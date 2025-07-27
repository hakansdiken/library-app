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

  constructor(private borrowService: BorrowService) { }

  displayedColumns = ['userName', 'userEmail', 'bookTitle', 'status', 'borrowDate', 'returnDate'];

  ngOnInit(): void {

    this.loadBorrows();
  }

  loadBorrows() {

    const role = localStorage.getItem('userRole') as UserRole;
    const userId = localStorage.getItem('userId');

    if ((role === UserRole.Librarian || role === UserRole.Admin)) {

      this.borrowService.getBorrows().subscribe(borrowRes => {

        if (!this.displayedColumns.includes('actions')) {

          this.displayedColumns.push('actions');
        }
        this.borrows = borrowRes.data;
      });
    } else if (role === UserRole.Member && userId) {

      this.borrowService.getBorrowsByUser(userId).subscribe(borrowRes => {
        this.borrows = borrowRes.data;
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
        console.log("Error:" + err.error.message)
      }
    })
  }
}
