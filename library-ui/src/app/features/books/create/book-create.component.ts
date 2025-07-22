import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../../core/services/book/book.service';
import { CreateBook } from '../../../core/models/book/book.create.model';

@Component({
  selector: 'app-book-create',
  standalone: true,
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})

export class BookCreateComponent {

  book: CreateBook = {
    title: '',
    author: '',
    description: '',
    publisher: '',
    publicationYear: 0,
    isbn: '',
    deweyCode: '',
    pageCount: 0,
  };
  currentYear = new Date().getFullYear();

  constructor(private bookService: BookService, private dialogRef: MatDialogRef<BookCreateComponent>) { }

  createBook(createForm: NgForm) {

    if (createForm.invalid) {
      return;
    }

    this.bookService.createBook(this.book).subscribe({

      next: (createdBook) => {

        this.dialogRef.close(createdBook);
      },
      error: (err) => {

        console.error('Error:', err);
        alert('Book could not be added.');
      }
    });
  }

}
