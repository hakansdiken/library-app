import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackbarUtil {

    constructor(private snackBar: MatSnackBar) { }

    showSuccess(message: string) {

        this.snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    showError(message: string) {

        this.snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    showWarning(message: string) {

        this.snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['warning'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}