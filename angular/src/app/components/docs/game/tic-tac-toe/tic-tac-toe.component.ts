import { AfterViewChecked, Component } from '@angular/core';

import { HighlightService } from 'services/highlight/highlight.service';
import { HttpService } from 'services/http/http.service';
import { ScrollService } from 'services/scroll/scroll.service';

@Component({
  selector: 'app-docs-game-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class DocsGameTicTacToeComponent implements AfterViewChecked {

  private highlighted: boolean;
  public actionExample: string;
  public stateExample: string;

  constructor(
    private highlightService: HighlightService,
    private httpService: HttpService,
    private scrollService: ScrollService,
  ) {
    this.highlighted = false;
    this.loadActionExample();
    this.loadStateExample();
  }

  ngAfterViewChecked() {
    if(this.highlighted) {
      return;
    }
    if(!this.actionExample || !this.stateExample) {
      return;
    }
    this.highlighted = true;
    this.highlightService.highlightAll();
  }

  public scroll(target: string): void {
    this.scrollService.scroll(target, 'docs-scroll');
  }

  private loadActionExample(): void {
    this.httpService
      .getAsset('snippets/tic-tac-toe-action-example.json')
      .subscribe(snippet => {
        this.actionExample = snippet;
      });
  }

  private loadStateExample(): void {
    this.httpService
      .getAsset('snippets/tic-tac-toe-state-example.json')
      .subscribe(snippet => {
        this.stateExample = snippet;
      });
  }

}
