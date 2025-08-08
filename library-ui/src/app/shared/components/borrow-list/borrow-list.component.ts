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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User } from '../../../core/models/user/user.model';

@Component({
  selector: 'app-borrow-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})
export class BorrowListComponent implements OnInit {

  borrows: Borrow[] = [];
  displayedColumns: string[] = ['userName', 'userEmail', 'bookTitle', 'status', 'borrowDate', 'returnDate'];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems?: number;

  currentUser?: User | null;
  isOverdueMode: boolean = false;

  constructor(private borrowService: BorrowService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    if (this.currentUser) {

      this.loadBorrows(this.currentUser);
    }
  }

  loadBorrows(user: User, overdueMode: boolean = false): void {

    this.isOverdueMode = overdueMode;

    const { role, id: userId } = user;

    if (!this.displayedColumns.includes('actions') && (role === UserRole.Librarian || role === UserRole.Admin)) { //actions kolumu varsa eklemesin

      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }

    const serviceCall = overdueMode
      ? this.borrowService.getOverdueBorrows(this.pageIndex, this.itemsPerPage)
      : (role === UserRole.Librarian || role === UserRole.Admin)
        ? this.borrowService.getBorrows(this.pageIndex, this.itemsPerPage)
        : this.borrowService.getBorrowsByUser(userId, this.pageIndex, this.itemsPerPage);

    serviceCall.subscribe({

      next: (res) => {

        this.borrows = res.data ?? [];

        this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
        this.totalItems = Number(res.pagination?.totalItems);
        this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10);
      },
      error: (err) => {
        console.error('Error:', err.error?.message);
      }
    });
  }

  toggleOverdue(): void {

    if (this.currentUser) {

      this.pageIndex = 0;

      this.loadBorrows(this.currentUser, !this.isOverdueMode);

    }
  }

  markAsReturned(borrowId: string): void {
    this.borrowService.markReturned(borrowId).subscribe({
      next: () => {
        
        if (this.currentUser) {

          this.loadBorrows(this.currentUser, this.isOverdueMode);
        }
      },
      error: err => {
        console.error("Error: ", err.error.message);
      }
    });
  }

  onPageChange(event: PageEvent): void {

    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;

    if (this.currentUser) {

      this.loadBorrows(this.currentUser, this.isOverdueMode);
    }
  }
}
