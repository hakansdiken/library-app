import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../../core/services/user/user.service';
import { UpdateUser } from '../../../../core/models/user/update-user.model';
import { User } from '../../../../core/models/user/user.model';
import { UserRole } from '../../../../core/models/enums/user-role.enum';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: '../user-form/user-form.component.html',
  styleUrls: ['./user-edit.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class UserEditComponent implements OnInit {

  user: UpdateUser & { password?: string } = {
    name: '',
    surname: '',
    email: '',
    role: '',
    password: ''
  };

  userRoles = [UserRole.Admin, UserRole.Librarian, UserRole.Member];
  isEditMode = true;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) { }

  ngOnInit(): void {
    if (this.data?.user) {
      this.user = {
        name: this.data.user.name,
        surname: this.data.user.surname,
        email: this.data.user.email,
        role: this.data.user.role,
        password: ''
      };
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { password, ...updateData } = this.user;

    this.userService.editUser(this.data.user.id, updateData as UpdateUser).subscribe({
      next: (updatedUser) => {
        this.dialogRef.close(updatedUser);
      },
      error: (err) => {
        console.log("Error: " + err);
      }
    });
  }
}