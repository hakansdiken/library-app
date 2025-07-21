import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/models/auth/login.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit() {

    this.authService.login(this.loginData).subscribe({

      next: (res) => {

        this.router.navigate(['/books'])
        console.log("Login success:", res);
      },
      error: (err) => {

        console.error("Login failed:", err);
      }
    });
  }

}
