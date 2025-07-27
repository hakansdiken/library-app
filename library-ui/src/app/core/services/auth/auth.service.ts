import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) { }

  register(data: RegisterRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.REGISTER}`, data, { withCredentials: true });
  }

// pipe, subscribe olmadan önce veriyi işlemek, dönüştürmek, filtrelemek için kullanılır. veri akarken üzerinde işlem yapmak için.
// tap ise, veriyi değiştirmeden yan işlem yapmak için kullandık. burada localStoragea role ve idmizi set ettik
  login(data: LoginRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.LOGIN}`, data, { withCredentials: true }).pipe(   
      tap(res => {

        if (res.success && res.data) {

          if (res.data.role) {

            localStorage.setItem('userRole', res.data.role);
          }
          if (res.data.id) {

            localStorage.setItem('userId', res.data.id);
          }
        }
      })
    );
  }

  logout(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${API_ENDPOINTS.AUTH.LOGOUT}`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
      })
    );
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  } 
}
