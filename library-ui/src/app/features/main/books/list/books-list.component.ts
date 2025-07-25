import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/services/book/book.service';
import { Book } from '../../../../core/models/book/book.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookCreateComponent } from '../create/book-create.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserRole } from '../../../../core/models/enums/user-role.enum';

@Component({
  selector: 'app-books-list',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {

  books: Book[] = [];
  userRole: string = UserRole.Member;
  
  constructor(private bookService: BookService, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe((res) => {
      this.userRole = res.data.role ?? UserRole.Member;
    });

    this.loadBooks()
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
}
