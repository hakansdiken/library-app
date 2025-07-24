import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../../core/services/book/book.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../../core/models/book/book.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})

export class BookDetailComponent implements OnInit {

  book: Book | null = null;


  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.loadBook(id);
    } else {

      console.error('Book id is missing in the route!');
    }
  }

  loadBook(id: string) {

    this.bookService.getBookById(id).subscribe({

      next: (response) => {
        this.book = response.data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
