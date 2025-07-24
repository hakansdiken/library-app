import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-ui';

  constructor(private router: Router) { }

  shouldShowNavbar(): boolean {

    const hideOnRoutes = ['/auth'];

    return !hideOnRoutes.some(route => this.router.url.includes(route));
  }
}
