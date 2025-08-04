import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/generic.model';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { Borrow } from '../../models/borrow/borrow';
import { CreateBorrow } from '../../models/borrow/create-borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }

  getBorrows(page?: number, limit?: number): Observable<ApiResponse<Borrow[]>> {

    return this.http.get<ApiResponse<Borrow[]>>(`${API_ENDPOINTS.BORROWS.ROOT(page, limit)}`, { withCredentials: true });
  }

  getBorrowsByUser(userId: string, page?: number, limit?: number): Observable<ApiResponse<Borrow[]>> {

    return this.http.get<ApiResponse<Borrow[]>>(`${API_ENDPOINTS.BORROWS.BY_USERID(userId, page, limit)}`, { withCredentials: true });
  }

  getBorrowsByBook(bookId: string, page?: number, limit?: number): Observable<ApiResponse<Borrow[]>> {

    return this.http.get<ApiResponse<Borrow[]>>(`${API_ENDPOINTS.BORROWS.BY_BOOKID(bookId, page, limit)}`, { withCredentials: true });
  }

  markReturned(borrowId: string): Observable<ApiResponse<Borrow>> {

    return this.http.patch<ApiResponse<Borrow>>(`${API_ENDPOINTS.BORROWS.RETURN(borrowId)}`, {}, { withCredentials: true })
  }

  createBorrow(data: CreateBorrow): Observable<ApiResponse<Borrow>> {

    return this.http.post<ApiResponse<Borrow>>(`${API_ENDPOINTS.BORROWS.CREATE}`, (data), { withCredentials: true })
  }
}
