import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { UserRole } from '../../core/models/enums/user-role.enum';
import { User } from '../../core/models/user/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  userRole: string | null = null;
  currentUser: User | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.currentUser = this.authService.getUser();
    console.log(this.currentUser)

    this.userRole = this.currentUser?.role ?? UserRole.Member;

  }

  isAdmin(): boolean {
    return this.userRole === UserRole.Admin;
  }

  goToBooks() {
    this.router.navigate(['/books']);
  }

  goToBorrows() {
    this.router.navigate(['/borrows']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
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

