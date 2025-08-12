import { Component, OnInit } from '@angular/core';
import { BorrowListComponent } from '../borrow-list/borrow-list.component';
import { BorrowService } from '../../../../core/services/borrow/borrow.service';
import { Borrow } from '../../../../core/models/borrow/borrow';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../../../core/models/user/user.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserRole } from '../../../../core/models/enums/user-role.enum';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-borrow-container',
  standalone: true,
  imports: [BorrowListComponent, MatSelectModule, CommonModule],
  templateUrl: './borrow-container.component.html',
  styleUrl: './borrow-container.component.css'
})
export class BorrowContainerComponent implements OnInit {

  selectedListType: string = 'all';
  borrows: Borrow[] = [];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  targetBookId?: string | null;
  targetUserId?: string | null;
  currentUser: User | null = null;


  constructor(private borrowService: BorrowService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    this.route.queryParamMap.subscribe(params => {
      this.targetUserId = params.get('userId');
      this.targetBookId = params.get('bookId');

      if (this.currentUser) {

        this.loadBorrows(this.currentUser, this.targetUserId, this.targetBookId);
      }
    });
  }


  showAllBorrows() {
    this.selectedListType = 'all';

    if (this.currentUser) {

      this.loadBorrows(this.currentUser);
    }
  }

  showOverdueBorrows() {
    this.selectedListType = 'overdue';

    if (this.currentUser) {

      this.loadBorrows(this.currentUser);
    }
  }

  private loadBorrows(user: User, targetUserId?: string | null, targetBookId?: string | null) {
    const { role, id: userId } = user;

    if (role === UserRole.Admin || role === UserRole.Librarian) {

      if (targetUserId) {

        this.borrowService.getBorrowsByUser(targetUserId, this.pageIndex, this.itemsPerPage).subscribe(res => {

          this.borrows = res.data ?? [];
          this.updatePagination(res);
        });

        return;
      }

      if (targetBookId) {

        this.borrowService.getBorrowsByBook(targetBookId, this.pageIndex, this.itemsPerPage).subscribe(res => {

          this.borrows = res.data ?? [];
          this.updatePagination(res);
        });

        return;
      }

      if (this.selectedListType === 'all' && !(targetUserId || targetBookId)) {

        this.borrowService.getBorrows(this.pageIndex, this.itemsPerPage).subscribe({

          next: (res) => {

            this.borrows = res.data ?? [];
            this.updatePagination(res);
          },
          error: (err) => {

            console.error('Error:', err.error?.message);
          }
        });
      } else if (this.selectedListType === 'overdue' && !(targetUserId || targetBookId)) {
        this.borrowService.getOverdueBorrows(this.pageIndex, this.itemsPerPage).subscribe({

          next: (res) => {

            this.borrows = res.data ?? [];

            this.updatePagination(res);
          },
          error: (err) => {
            console.error('Error:', err.error?.message);
          }
        });
      }
    } else {
      this.borrowService.getBorrowsByUser(userId, this.pageIndex, this.itemsPerPage).subscribe({
        next: (res) => {
          this.borrows = res.data ?? [];
          this.updatePagination(res);
        },
        error: (err) => {
          console.error('Error:', err.error?.message);
        }
      });
    }
  }

  onPageChange(event: PageEvent) {

    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;

    if (this.currentUser) {
      this.loadBorrows(this.currentUser, this.targetUserId, this.targetBookId);
    }
  }

  markAsReturned(borrowId: string): void {
    this.borrowService.markReturned(borrowId).subscribe({
      next: () => {

        if (this.currentUser) {
          this.loadBorrows(this.currentUser, this.targetUserId, this.targetBookId);
        }
      },
      error: err => {
        console.error("Error: ", err.error.message);
      }
    });
  }

  changeListType(newType: string) {

    this.selectedListType = newType;
    this.pageIndex = 0;

    if (this.currentUser) {

      this.loadBorrows(this.currentUser);
    }
  }

  private updatePagination(res: any) {
    this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
    this.totalItems = Number(res.pagination?.totalItems ?? 0);
    this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10);
  }
}