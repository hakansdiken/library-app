import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/generic.model';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { Borrow } from '../../models/borrow/borrow';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }

  getBorrows(): Observable<ApiResponse<Borrow[]>> {

    return this.http.get<ApiResponse<Borrow[]>>(`${API_ENDPOINTS.BORROWS.ROOT}`, { withCredentials: true });
  }

  getBorrowsByUser(userId: string): Observable<ApiResponse<Borrow[]>> {

    return this.http.get<ApiResponse<Borrow[]>>(`${API_ENDPOINTS.BORROWS.BY_USERID(userId)}`, { withCredentials: true });
  }

  markReturned(borrowId: string): Observable<ApiResponse<Borrow>> {

    return this.http.patch<ApiResponse<Borrow>>(`${API_ENDPOINTS.BORROWS.RETURN(borrowId)}`, {}, { withCredentials: true })
  }
}
