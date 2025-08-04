import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/auth/register.model';
import { LoginRequest } from '../../models/auth/login.model';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse } from '../../models/generic.model';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null); // Oturumdaki kullanıcı bilgisini tutan, başlangıçta null olan Observable değişken.
  currentUser$ = this.currentUserSubject.asObservable(); // Dışarıya sadece subscribe olunabilen, yani okunabilen Observable olarak açılıyor.

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.REGISTER}`, data, { withCredentials: true });
  }

  login(data: LoginRequest): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.LOGIN}`, data, { withCredentials: true }).pipe(
      tap((res) => {

        this.currentUserSubject.next(res.data);
      })
    );
  }

  logout(): Observable<ApiResponse<null>> {

    return this.http.post<ApiResponse<null>>(`${API_ENDPOINTS.AUTH.LOGOUT}`, {}, { withCredentials: true }).pipe(

      tap(() => {

        this.currentUserSubject.next(null);
      })
    );
  }

  getCurrentUser(): Observable<ApiResponse<User>> {

    return this.http.get<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.ME}`, { withCredentials: true }).pipe(
      tap(res => {

        this.currentUserSubject.next(res.data);
      })
    );
  }

  setUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }
}
