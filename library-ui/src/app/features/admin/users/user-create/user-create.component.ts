import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { UserService } from '../../../../core/services/user/user.service';
import { CreateUser } from '../../../../core/models/user/create-user.model';
import { UserRole } from '../../../../core/models/enums/user-role.enum';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: '../user-form/user-form.component.html',
  styleUrls: ['./user-create.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class UserCreateComponent {
  user: CreateUser = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
  };

  userRoles = [UserRole.Admin, UserRole.Librarian, UserRole.Member];
  isEditMode = false;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) { }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.userService.createUser(this.user).subscribe({
      next: (createdUser) => this.dialogRef.close(createdUser),
      error: (err) => console.error(err.error?.message),
    });
  }
}
