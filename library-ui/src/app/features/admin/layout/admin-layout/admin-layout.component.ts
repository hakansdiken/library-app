import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminSidenavComponent } from '../../../../layout/admin-sidenav/admin-sidenav.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, AdminSidenavComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})

export class AdminLayoutComponent { }
