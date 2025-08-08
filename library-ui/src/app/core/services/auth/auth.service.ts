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

  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.REGISTER}`, data, { withCredentials: true });
  }

  login(data: LoginRequest): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.LOGIN}`, data, { withCredentials: true })
  }

  logout(): Observable<ApiResponse<null>> {

    return this.http.post<ApiResponse<null>>(`${API_ENDPOINTS.AUTH.LOGOUT}`, {}, { withCredentials: true })
  }

  getCurrentUser(): Observable<ApiResponse<User>> {

    return this.http.get<ApiResponse<User>>(`${API_ENDPOINTS.AUTH.ME}`, { withCredentials: true })
  }

  setUser(user: User | null) {

    this.currentUser = user;
  }

  getUser(): User | null {

    return this.currentUser;
  }

  getUserRole() {

    return this.currentUser?.role;
  }
}
