import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterRequest } from '../../../core/models/auth/register.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  registerData: RegisterRequest = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  onSubmit() {

    this.authService.register(this.registerData).subscribe({
      
      next: (res) => {
        console.log("Register success:", res);
      },
      error: (err) => {

        console.error("Register failed:", err);
      }
    });
  }
}
