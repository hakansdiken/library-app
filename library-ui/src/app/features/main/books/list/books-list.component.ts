import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/services/book/book.service';
import { Book } from '../../../../core/models/book/book.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookFormComponent } from '../../../../shared/components/book-form/book-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserRole } from '../../../../core/models/enums/user-role.enum';
import { UserSelectDialogComponent } from '../../../../shared/components/user-select-dialog/user-select-dialog.component';
import { BorrowService } from '../../../../core/services/borrow/borrow.service';
import { User } from '../../../../core/models/user/user.model';
import { CreateBorrow } from '../../../../core/models/borrow/create-borrow.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatPaginatorModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {


  books: Book[] = [];
  userRole: string = UserRole.Member;
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems?: number;

  constructor(private bookService: BookService, private borrowService: BorrowService, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    const currentUser = this.authService.getUser();

    this.userRole = currentUser?.role ?? UserRole.Member;

    this.loadBooks();
  }

  goToBookDetail(bookId: string) {

    this.router.navigate([`/books/${bookId}`]);
  }

  loadBooks() {

    this.bookService.getBooks(this.pageIndex, this.itemsPerPage).subscribe({

      next: (res) => {

        this.books = res.data ?? [];
        this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
        this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10);
        this.totalItems = Number(res.pagination?.totalItems);
      },
      error: (err) => {

        console.error('Error:', err.error?.message);
      }
    });
  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loadBooks();
      }
    });
  }

  openLendDialog(book: Book) {
    const dialogRef = this.dialog.open(UserSelectDialogComponent, {
      width: '600px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe((selectedUser: User) => {

      if (selectedUser) {

        this.createBorrow(book, selectedUser);
      }
    });
  }

  createBorrow(book: Book, user: User): void {
    if (!book.id) {

      return;
    }

    if (!user.id) {

      return;
    }

    const borrowRequest: CreateBorrow = {
      bookId: book.id,
      userId: user.id
    };

    this.borrowService.createBorrow(borrowRequest).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (err) => {
        console.error('Error: ', err.error?.message);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadBooks();
  }
}
