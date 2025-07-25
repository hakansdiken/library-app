import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})

export class AdminLayoutComponent {

  constructor(private authService: AuthService, private router: Router) {

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

        this.router.navigate(['/auth']);
      },

      error: (err) => {

        console.error('Logout failed:', err);
      }
    });
  }
}
