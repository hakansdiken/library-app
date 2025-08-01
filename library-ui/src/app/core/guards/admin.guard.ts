import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {

    return this.authService.getCurrentUser().pipe(
      map(res => {

        if (res.success && res.data?.role === 'admin') {

          return true;
          
        } else {

          this.router.navigate(['/books']);

          return false;
        }
      }),
      catchError(() => {

        return of(false);
      })
    );
  }
}