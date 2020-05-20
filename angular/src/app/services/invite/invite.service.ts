import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Room } from 'interfaces/base';
import { Invite } from 'interfaces/invite';
import { InviteDialogComponent } from 'components/dialogs/invite/invite.component';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private invites: Array<Invite> = [];

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  addInvite(room: Room): void {
    this.invites.push({
      room,
      dismissed: false
    } as Invite);
    this.showInvites();
  }

  showInvites(): void {
    this.invites = this.invites.filter(invite => !invite.dismissed);
    this.snackBar.openFromComponent(InviteDialogComponent, {
      duration: 9999999,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      data: this.invites,
    });
  }
}
