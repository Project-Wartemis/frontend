import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  success(message): void {
    console.log(message);
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  error(message, error): void {
    console.error(message, error);
    if(error?.error?.message) {
      message = `${message} - ${error.error.message}`;
    }
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
