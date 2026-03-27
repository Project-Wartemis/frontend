import { Component, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { Invite } from 'interfaces/invite';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteDialogComponent implements OnDestroy {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public invites: Array<Invite>,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }

  join(invite: Invite): void {
    this.router.navigate(['/game', invite.game.id]);
    this.close(invite);
  }

  close(invite: Invite): void {
    invite.dismissed = true;
    this.invites = this.invites.filter(i => i !== invite);
    if(!this.invites.length) {
      this.snackBar.dismiss();
    }
  }

}
