import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) { }

  goToBooks() {
    this.router.navigate(['/books']);
  }

  goToBorrows() {
    this.router.navigate(['/borrows']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
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

