import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Roles } from '../../../constants/roles';
import { CommonModule } from '@angular/common';
import { UserRole } from '../../core/models/enums/user-role.enum';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    const currentUser = this.authService.getUser();

    this.userRole = currentUser?.role ?? UserRole.Member;

  }

  isAdmin(): boolean {
    return this.userRole === Roles.ADMIN;
  }

  goToBooks() {
    this.router.navigate(['/books']);
  }

  goToBorrows() {
    this.router.navigate(['/borrows']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
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

