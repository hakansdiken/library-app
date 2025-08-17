import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Borrow } from '../../../../core/models/borrow/borrow';
import { User } from '../../../../core/models/user/user.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Roles } from '../../../../../constants/roles';

@Component({
  selector: 'app-borrow-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css'],
})
export class BorrowListComponent {

  @Input() borrows: Borrow[] = [];
  @Input() pageIndex: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 0;
  @Input() listType: string = 'all';
  @Input() searchKey?: string = '';

  currentUser?: User | null;
  displayedColumns: string[] = [
    'userName',
    'userEmail',
    'bookTitle',
    'status',
    'borrowDate',
    'returnDate',
  ];

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() markReturned = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();

    if ((this.currentUser?.role === Roles.ADMIN || this.currentUser?.role === Roles.LIBRARIAN)
      && !this.displayedColumns.includes('actions')) {

      this.displayedColumns.push('actions');
    }
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  markAsReturned(borrowId: string) {

    this.markReturned.emit(borrowId); //event emitter ile parenta bildiriyoruz.
  }
}
