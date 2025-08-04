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

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatPaginatorModule],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'
})
export class BookManagementComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'publicationYear', 'isBorrowed', 'actions'];
  pageIndex: number = 0;
  itemsPerPage: number = 10;
  totalItems?: number;


  constructor(private bookService: BookService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.loadBooks();
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
        console.error('Error: ', err.error?.message)
      }
    });
  }

  deleteBook(bookId: string): void {

    this.bookService.deleteBook(bookId).subscribe({
      next: () => {

        this.loadBooks();
      },
      error: (err) => {

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

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadBooks();
  }
}
