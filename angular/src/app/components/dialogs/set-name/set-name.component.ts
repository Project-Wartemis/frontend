import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-name',
  templateUrl: './set-name.component.html',
  styleUrls: ['./set-name.component.scss']
})
export class SetNameDialogComponent {

  name: string;

  constructor(
    private dialogRef: MatDialogRef<SetNameDialogComponent>,
  ) { }

  close(name?: string): void {
    this.dialogRef.close(name);
  }
}
