import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/services/book/book.service';
import { Book } from '../../../../core/models/book/book.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookCreateComponent } from '../../../../shared/components/book-create/book-create.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserRole } from '../../../../core/models/enums/user-role.enum';
import { UserSelectDialogComponent } from '../../../../shared/components/user-select-dialog/user-select-dialog.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {


  books: Book[] = [];
  userRole: string = UserRole.Member;

  constructor(private bookService: BookService, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    const role = localStorage.getItem('userRole') as UserRole;

    this.userRole = role ?? UserRole.Member;

    this.loadBooks();
  }

  goToBookDetail(bookId: string) {

    this.router.navigate([`/books/${bookId}`]);
  }


  loadBooks() {

    this.bookService.getBooks().subscribe({

      next: (response) => {

        this.books = response.data;
      },
      error: (err) => {

        console.error('Error:', err);
      }
    });
  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(BookCreateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loadBooks();
      }
    });
  }

  openLendDialog() {
    const dialogRef = this.dialog.open(UserSelectDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks();
      }
    });
  }
}
