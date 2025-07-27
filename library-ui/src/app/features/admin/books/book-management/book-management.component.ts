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

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'
})
export class BookManagementComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'publicationYear', 'actions'];
  isLoading = false;


  constructor(private bookService: BookService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.loadBooks();
  }


  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({

      next: (res) => {

        console.log("book" + res)
        this.books = res.data;
        this.isLoading = false;

      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  deleteBook(bookId: string): void {

    this.bookService.deleteBook(bookId).subscribe({
      next: () => {

        this.loadBooks();
      },
      error: (err) => {

        console.log("Error:" + err.message)
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
}
