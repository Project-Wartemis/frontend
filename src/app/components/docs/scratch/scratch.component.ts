import { AfterViewChecked, Component } from '@angular/core';

import { ActionMessage, ErrorMessage, Message, RegisterMessage, StateMessage } from 'interfaces/message';
import { HighlightService } from 'services/highlight/highlight.service';
import { HttpService } from 'services/http/http.service';
import { ScrollService } from 'services/scroll/scroll.service';

@Component({
  selector: 'app-docs-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.scss']
})
export class DocsScratchComponent implements AfterViewChecked {

  private highlighted: boolean;
  // incoming
  public messageConnected: string;
  public messageError: string;
  public messageRegistered: string;
  public messageState: string;
  // outgoing
  public messageAction: string;
  public messageRegister: string;

  constructor(
    private highlightService: HighlightService,
    private httpService: HttpService,
    private scrollService: ScrollService,
  ) {
    this.highlighted = false;
    // incoming
    this.messageConnected = JSON.stringify({
      type: 'connected'
    } as Message, null, 2);
    this.messageError = JSON.stringify({
      type: 'error',
      message: 'You messed up.'
    } as ErrorMessage, null, 2);
    this.messageRegistered = JSON.stringify({
      type: 'registered'
    } as Message, null, 2);
    this.messageState = JSON.stringify({
      type: 'state',
      game: 36,
      key: 'ceabfbac-0fcd-45fa-a7ea-6b1d29f71a4e',
      turn: 2,
      move: true,
      state: {}
    } as StateMessage, null, 2);
    // outgoing
    this.messageAction = JSON.stringify({
      type: 'action',
      game: 36,
      key: 'ceabfbac-0fcd-45fa-a7ea-6b1d29f71a4e',
      action: {}
    } as ActionMessage, null, 2);
    this.messageRegister = JSON.stringify({
      type: 'register',
      clientType: 'bot',
      name: 'Your bot name',
      game: 'Tic Tac Toe'
    } as RegisterMessage, null, 2);
  }

  ngAfterViewChecked() {
    if(this.highlighted) {
      return;
    }
    this.highlighted = true;
    this.highlightService.highlightAll();
  }

  public scroll(target: string): void {
    this.scrollService.scroll(target, 'docs-scroll');
  }

}
