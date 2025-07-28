import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/generic.model';
import { User } from '../../models/user/user.model';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { CreateUser } from '../../models/user/create-user.model';
import { UpdateUser } from '../../models/user/update-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<ApiResponse<User[]>> {

    return this.http.get<ApiResponse<User[]>>(`${API_ENDPOINTS.USERS.ROOT}`, { withCredentials: true });
  }

  getUserById(id: string): Observable<ApiResponse<User>> {

    return this.http.get<ApiResponse<User>>(`${API_ENDPOINTS.USERS.BY_ID(id)}`, { withCredentials: true });
  }

  createUser(user: CreateUser): Observable<User> {

    return this.http.post<User>(API_ENDPOINTS.USERS.CREATE, user, { withCredentials: true });
  }

  deleteUser(id: string): Observable<void> {

    return this.http.delete<void>(`${API_ENDPOINTS.USERS.DELETE(id)}`, { withCredentials: true });
  }

  editUser(id: string, user: UpdateUser): Observable<User> {

    return this.http.put<User>(API_ENDPOINTS.USERS.EDIT(id), user, { withCredentials: true });
  }
}
