import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogData } from '../../models/dialog-data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  constructor(
    private dialogRef: MatDialogRef<AlertComponent, { isConfirmed: boolean }>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  getConfirmBtnColor(): string | null | undefined {
    if (this.data.type === 'error' || this.data.type === 'warn') {
      return 'warn';
    }
    return 'primary';
  }

  onConfirm() {
    this.dialogRef.close({ isConfirmed: true });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
