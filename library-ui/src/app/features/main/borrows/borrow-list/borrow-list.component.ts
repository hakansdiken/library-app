import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../../../../core/services/borrow/borrow.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Borrow } from '../../../../core/models/borrow/borrow';
import { UserRole } from '../../../../core/models/enums/user-role.enum';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

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

    this.authService.getCurrentUser().subscribe({

      next: res => {

        if (res.success && res.data) {

          const role = res.data.role;
          const userId = res.data.id;

          if (role === UserRole.Librarian || UserRole.Admin) {

            this.borrowService.getBorrows().subscribe(borrowRes => {

              this.displayedColumns.push('actions');

              this.borrows = borrowRes.data;

            });
          } else if (role === UserRole.Member) {

            this.borrowService.getBorrowsByUser(userId ?? '').subscribe(borrowRes => {

              this.borrows = borrowRes.data;
            });
          }
        } else {

          this.borrows = [];
        }
      },
      error: err => {
        console.error('Error fetching current user', err);
        this.borrows = [];
      }
    });
  }

  markAsReturned(borrowId: string) {
    this.borrowService.markReturned(borrowId).subscribe({
      next: res => {
        console.log("returned")
      }
    })
  }
}
