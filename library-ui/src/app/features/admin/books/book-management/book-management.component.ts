import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/services/book/book.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Book } from '../../../../core/models/book/book.model';
import { BookFormComponent } from '../../../../shared/components/book-form/book-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from '../../../../shared/components/delete-component/delete-item.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarUtil } from '../../../../shared/utils/snackbar-util';


@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatPaginatorModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'
})
export class BookManagementComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'publicationYear', 'isBorrowed', 'actions'];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems?: number;
  searchKey?: string = '';

  constructor(private bookService: BookService, private dialog: MatDialog, private router: Router, private snackbarUtil: SnackbarUtil) { }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.loadBooks();
  }


  loadBooks() {
    this.bookService.getBooks(this.pageIndex, this.itemsPerPage, this.searchKey).subscribe({

      next: (res) => {

        this.books = res.data ?? [];
        this.pageIndex = Number(res.pagination?.pageIndex ?? 0);
        this.itemsPerPage = Number(res.pagination?.itemsPerPage ?? 10);
        this.totalItems = Number(res.pagination?.totalItems);
      },
      error: (err) => {
        console.error('Error: ', err.error?.message)
      }
    });
  }

  deleteBook(bookId: string): void {

    this.bookService.deleteBook(bookId).subscribe({
      next: () => {

        this.snackbarUtil.showSuccess('🎉 Book deleted successfully!')

        this.loadBooks();
      },
      error: (err) => {
        this.snackbarUtil.showError('❌ An error occurred while deleting book!')

        console.error("Error:" + err.error?.message)
      }
    });
  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(BookFormComponent, {

      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadBooks();
      }
    });
  }

  openEditDialog(book: Book) {

    const dialogRef = this.dialog.open(BookFormComponent, {

      width: '600px',
      data: { mode: 'edit', book: book }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadBooks();
      }
    });
  }

  openDeleteDialog(book: Book) {

    if (book.isBorrowed) {

      this.snackbarUtil.showWarning('⚠️ Borrowed books cannot be deleted!')

      return;
    }

    const dialogRef = this.dialog.open(DeleteItemComponent, {

      width: '400px',
      data: {
        title: 'Delete Book',
        message: `Are you sure you want to delete ${book.title}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.deleteBook(book.id);
      }
    });
  }

  goToBorrowHistory(bookId: string) {

    const currentUrl = this.router.url;  // mevcut url path + querystring
    const isAdminRoute = currentUrl.startsWith('/admin');

    if (isAdminRoute) {
      this.router.navigate(['/admin/borrows'], { queryParams: { bookId } });
    } else {
      this.router.navigate(['/borrows'], { queryParams: { bookId } });
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadBooks();
  }
}
