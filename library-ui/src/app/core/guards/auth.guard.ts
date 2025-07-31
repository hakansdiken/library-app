import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {

    return this.authService.getCurrentUser().pipe(
      map(res => {

        if (res.success) {

          this.authService.setUser(res.data);

          return true;
        } else {

          this.router.navigate(['/auth']);

          return false;
        }
      }),
      catchError(() => {

        return of(false);
      })
    );
  }
}
