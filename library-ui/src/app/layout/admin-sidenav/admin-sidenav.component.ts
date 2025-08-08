import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.css'
})
export class AdminSidenavComponent {

  constructor(private router: Router, private authService: AuthService) {

  }
  goToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  goToBooks() {
    this.router.navigate(['/admin/books']);
  }

  goToBorrows() {
    this.router.navigate(['/admin/borrows']);
  }

  goToUsers() {
    this.router.navigate(['/admin/users']);
  }

  logout() {

    this.authService.logout().subscribe({

      next: () => {

        this.authService.setUser(null)
        this.router.navigate(['/auth']);
      },

      error: (err) => {

        console.error('Logout failed:', err.error?.message);
      }
    });
  }

}
