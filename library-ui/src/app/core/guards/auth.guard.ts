import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    const cachedUser = this.authService.getUser();

    if (cachedUser) {
      return of(true);
    }

    return this.authService.getCurrentUser().pipe(
      map(res => {

        if (res.success) {

          if (res.data) {
            this.authService.setUser(res.data);
          }

          return true;
        } else {

          // this.router.navigate(['/auth']);

          return false;
        }
      }),
      catchError(() => {

        // this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }
}
