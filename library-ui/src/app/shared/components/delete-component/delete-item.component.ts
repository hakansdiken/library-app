import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-component',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css'
})
export class DeleteItemComponent {
  constructor(private dialogRef: MatDialogRef<DeleteItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onConfirm(): void {
    this.dialogRef.close(true); // true dönerse silinsin
  }

  onCancel(): void {
    this.dialogRef.close(false); // false dönerse iptal
  }
}
