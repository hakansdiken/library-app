import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../../models/auth/register.model';
import { LoginRequest, LoginResponse } from '../../models/auth/login.model';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<RegisterResponse> {

    return this.http.post<RegisterResponse>(`${API_ENDPOINTS.AUTH.REGISTER}`, data, { withCredentials: true })
  }

  login(data: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${API_ENDPOINTS.AUTH.LOGIN}`, data, { withCredentials: true })
  }
}
