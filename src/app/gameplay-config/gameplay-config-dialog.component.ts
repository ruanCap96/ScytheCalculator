import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gampeplay-config-dialog',
  templateUrl: './gameplay-config-dialog.component.html',
  styleUrls: ['./gameplay-config-dialog.component.scss'],
})
export class GamePlayConfigDialogComponent {
  totalPlayers: number;

  constructor(
    private readonly _dialogRef: MatDialogRef<GamePlayConfigDialogComponent>,
    private readonly toastr: ToastrService,
  ) {}

  closeDialog(): void {
    this._dialogRef.close();
  }

  saveDialog(): void {
    if (this.totalPlayers < 2) {
      this.toastr.warning('Please select more than 1 player');
      return;
    }

    this._dialogRef.close(this.totalPlayers);
  }
}
