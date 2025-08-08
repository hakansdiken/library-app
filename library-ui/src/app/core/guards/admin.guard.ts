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
    const cachedUser = this.authService.getUser();

    if (cachedUser) {

      if (cachedUser.role === 'admin') {

        return of(true); // methodumuz observable boolean döndürdüğü için of ile sarıyoruz responseu
      } else {

        this.router.navigate(['/books']);

        return of(false);
      }
    }

    return this.authService.getCurrentUser().pipe(
      // canActivate() sadece Observable<boolean> istediği için burada servisi bir 
      map(res => {

        if (res.success && res.data?.role === 'admin') {

          if (res.data) {

            this.authService.setUser(res.data);
          }

          return true; //Mevcut Observable içindeki değeri değiştiriyoruz.

        } else {

          this.router.navigate(['/books']);

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