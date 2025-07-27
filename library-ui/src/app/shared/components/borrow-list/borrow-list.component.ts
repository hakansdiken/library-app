import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Borrow } from '../../../core/models/borrow/borrow';
import { UserRole } from '../../../core/models/enums/user-role.enum';
import { AuthService } from '../../../core/services/auth/auth.service';
import { BorrowService } from '../../../core/services/borrow/borrow.service';

@Component({
  selector: 'app-borrow-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule],
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})

export class BorrowListComponent implements OnInit {

  borrows: Borrow[] = [];

  constructor(private borrowService: BorrowService, private authService: AuthService) { }

  displayedColumns = ['userName', 'userEmail', 'bookTitle', 'status', 'borrowDate', 'returnDate'];

  ngOnInit(): void {

    this.loadBorrows();
  }

  loadBorrows() {

    const role = localStorage.getItem('userRole') as UserRole;
    const userId = localStorage.getItem('userId');

    if (role === UserRole.Librarian || role === UserRole.Admin) {

      this.borrowService.getBorrows().subscribe(borrowRes => {

        this.displayedColumns.push('actions');
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
        console.log("returned")
      }
    })
  }
}
