import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'interfaces/base';
import { SessionService } from 'services/session/session.service';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameDialogComponent {

  public name: string;
  public engine: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public engines: Array<Client>,
    private dialogRef: MatDialogRef<NewGameDialogComponent>,
    public sessionService: SessionService,
  ) {
    if(this.sessionService.name$.getValue()) {
      this.name = this.sessionService.name$.getValue() + '\'s Game';
    }
    if(this.engines?.length) {
      this.engine = this.engines[0];
    }
  }

  close(name?: string, engine?: Client): void {
    if(!name || !engine) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close({name, engine});
    }
  }
}
