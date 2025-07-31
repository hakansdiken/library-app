import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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

  serverErrorMessage: string | null = null;
  successMessage: string | null = null;

  registerData: RegisterRequest = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };


  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(registerForm: NgForm) {

    if (registerForm.invalid) {

      return;
    }

    this.authService.register(this.registerData).subscribe({

      next: () => {

        this.serverErrorMessage = null;
        this.successMessage = "You registered successfully";

        registerForm.resetForm();
      },
      error: (err) => {

        console.error("error:", err);

        if (err.status === 400 && err.error?.message) {

          this.serverErrorMessage = err.error.message;

        } else {

          this.serverErrorMessage = "Unexpected error occurred.";
        }
      }
    });
  }

}