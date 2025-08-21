import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../../core/services/book/book.service';
import { CreateBook } from '../../../core/models/book/create-book.model';
import { Book } from '../../../core/models/book/book.model';
import { UpdateBook } from '../../../core/models/book/update-book.model';
import { SnackbarUtil } from '../../utils/snackbar-util';

@Component({
  selector: 'app-book-create',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogClose],
})
export class BookFormComponent implements OnInit {

  book: CreateBook = {
    title: '',
    author: '',
    description: '',
    publisher: '',
    publicationYear: new Date().getFullYear(),
    isbn: '',
    deweyCode: '',
    pageCount: 0,
  };

  currentYear = new Date().getFullYear();
  isEditMode = false;

  constructor(
    private bookService: BookService,
    private dialogRef: MatDialogRef<BookFormComponent>,
    private snackBarUtil: SnackbarUtil,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, book?: Book }
  ) { }

  ngOnInit() {
    if (this.data?.mode === 'edit' && this.data.book) {
      this.isEditMode = true;

      this.book = {
        title: this.data.book.title,
        author: this.data.book.author,
        description: this.data.book.description,
        publisher: this.data.book.publisher,
        publicationYear: this.data.book.publicationYear,
        isbn: this.data.book.isbn,
        deweyCode: this.data.book.deweyCode,
        pageCount: this.data.book.pageCount,
      };
    }
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    if (this.isEditMode) {

      const updateBook: UpdateBook = {
        id: Number(this.data.book!.id),
        title: this.book.title,
        author: this.book.author,
        description: this.book.description,
        publisher: this.book.publisher,
        publicationYear: this.book.publicationYear,
        isbn: this.book.isbn,
        deweyCode: this.book.deweyCode,
        pageCount: this.book.pageCount,
      };

      this.bookService.editBook(this.data.book!.id, updateBook).subscribe({

        next: (updatedBook) => {

          this.snackBarUtil.showSuccess('🎉 Book edited successfully!');

          this.dialogRef.close(updatedBook);
        },
        error: (err) => {
          this.snackBarUtil.showError('❌ An error occurred while editing book!')

          console.error('Error: ', err.error?.message);
        }
      });

    } else {

      this.bookService.createBook(this.book).subscribe({

        next: (createdBook) => {

          this.snackBarUtil.showSuccess('🎉 Book added successfully!');

          this.dialogRef.close(createdBook);
        },
        error: (err) => {

          this.snackBarUtil.showError('❌ An error occurred while adding book!')

          console.error('Error: ', err.error?.message);
        }
      });
    }
  }

}
