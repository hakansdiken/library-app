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
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarUtil } from '../../../utils/snackbar-util';

@Component({
  selector: 'app-borrow-container',
  standalone: true,
  imports: [
    BorrowListComponent,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './borrow-container.component.html',
  styleUrls: ['./borrow-container.component.css']
})
export class BorrowContainerComponent implements OnInit {

  selectedListType: string = 'all';
  borrows: Borrow[] = [];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  searchKey: string = '';

  targetBookId?: string | null;
  targetUserId?: string | null;
  currentUser: User | null = null;

  constructor(private borrowService: BorrowService, private authService: AuthService, private route: ActivatedRoute, private snackbarUtil: SnackbarUtil) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    this.route.queryParamMap.subscribe(params => {
      this.targetUserId = params.get('userId');
      this.targetBookId = params.get('bookId');

      if (this.currentUser) {
        this.loadBorrows({ user: this.currentUser, targetUserId: this.targetUserId, targetBookId: this.targetBookId, searchKey: this.searchKey });
      }
    });
  }

  showAllBorrows() {
    this.selectedListType = 'all';
    this.pageIndex = 0;

    if (this.currentUser) {

      this.loadBorrows({ user: this.currentUser, searchKey: this.searchKey });
    }
  }

  showOverdueBorrows() {
    this.selectedListType = 'overdue';
    this.pageIndex = 0;

    if (this.currentUser) {

      this.loadBorrows({ user: this.currentUser, searchKey: this.searchKey });
    }
  }

  loadBorrows({ user, targetUserId, targetBookId, searchKey }: {
    user: User | null,
    targetUserId?: string | null,
    targetBookId?: string | null,
    searchKey?: string
  }) {

    if (!user) return;

    const { role, id: userId } = user;

    let serviceCall;

    // Admin / Librarian field
    if (role === UserRole.Admin || role === UserRole.Librarian) {

      if (targetUserId) {

        serviceCall = this.borrowService.getBorrowsByUser(targetUserId, this.pageIndex, this.itemsPerPage, searchKey);

      } else if (targetBookId) {

        serviceCall = this.borrowService.getBorrowsByBook(targetBookId, this.pageIndex, this.itemsPerPage, searchKey);

      } else if (this.selectedListType === 'overdue') {

        serviceCall = this.borrowService.getOverdueBorrows(this.pageIndex, this.itemsPerPage, searchKey);

      } else {

        serviceCall = this.borrowService.getBorrows(this.pageIndex, this.itemsPerPage, searchKey);
      }
    } else {
      // member field
      serviceCall = this.borrowService.getBorrowsByUser(userId, this.pageIndex, this.itemsPerPage, searchKey);
    }

    serviceCall.subscribe({
      next: res => {
        this.borrows = res.data ?? [];
        this.updatePagination(res);
      },
      error: err => console.error('Error:', err.error?.message)
    });
  }

  onPageChange(event: PageEvent) {

    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;

    if (this.currentUser) {

      this.loadBorrows({ user: this.currentUser, targetUserId: this.targetUserId, targetBookId: this.targetBookId, searchKey: this.searchKey });
    }
  }

  markAsReturned(borrowId: string): void {
    this.borrowService.markReturned(borrowId).subscribe({
      next: () => {
        if (this.currentUser) {

          this.snackbarUtil.showSuccess('🎉 Book returned successfully!')

          this.loadBorrows({ user: this.currentUser, targetUserId: this.targetUserId, targetBookId: this.targetBookId, searchKey: this.searchKey });
        }
      },
      error: err => {
        this.snackbarUtil.showError('❌ An error occurred while returned book!')

        console.error('Error: ', err.error.message)
      }
    });
  }

  changeListType(newType: string) {

    this.selectedListType = newType;
    this.pageIndex = 0;

    if (this.currentUser) {
      this.loadBorrows({ user: this.currentUser, searchKey: this.searchKey });
    }
  }

  private updatePagination(res: any) {

    this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
    this.totalItems = Number(res.pagination?.totalItems ?? 0);
    this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10);
  }
}
