import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user/user.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  currentUser: User | null = null;

  constructor(private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    if (this.currentUser && this.currentUser.id) {

      this.loadUser(this.currentUser.id);
    }
  }


  loadUser(id: string) {
    this.userService.getUserById(id).subscribe({

      next: (res) => {

        this.user = res.data;
      },
      error: (err) => {

        console.error('Error:', err.error?.message);
      },
    })
  }

}
