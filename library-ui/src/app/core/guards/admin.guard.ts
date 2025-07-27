import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {

    const role = this.authService.getRole();

    if (role === 'admin') {

      return true;
    } else {

      this.router.navigate(['/books']); // daha sonra error sayfaları eklenecek
      return false;
    }
  }
}
