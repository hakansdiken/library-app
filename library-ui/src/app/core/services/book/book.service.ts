import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { Book } from '../../models/book/book.model';
import { ApiResponse } from '../../models/generic.model';
import { CreateBook } from '../../models/book/create-book.model';
import { UpdateBook } from '../../models/book/update-book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(page?: number, limit?: number, search?: string): Observable<ApiResponse<Book[]>> {

    return this.http.get<ApiResponse<Book[]>>(API_ENDPOINTS.BOOKS.ROOT(page, limit, search), { withCredentials: true });
  }

  getBookById(id: string): Observable<ApiResponse<Book>> {

    return this.http.get<ApiResponse<Book>>(API_ENDPOINTS.BOOKS.BY_ID(id), { withCredentials: true });
  }

  createBook(book: CreateBook): Observable<Book> {

    return this.http.post<Book>(API_ENDPOINTS.BOOKS.CREATE, book, { withCredentials: true });
  }

  deleteBook(id: string): Observable<void> {

    return this.http.delete<void>(API_ENDPOINTS.BOOKS.DELETE(id), { withCredentials: true });
  }

  editBook(id: string, book: UpdateBook): Observable<Book> {

    return this.http.put<Book>(API_ENDPOINTS.BOOKS.EDIT(id), book, { withCredentials: true });
  }

}
