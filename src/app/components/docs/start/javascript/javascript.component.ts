import { AfterViewChecked, Component } from '@angular/core';

import { HighlightService } from 'services/highlight/highlight.service';
import { HttpService } from 'services/http/http.service';
import { ScrollService } from 'services/scroll/scroll.service';

interface ApiTableRow {
  argument: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-docs-start-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.scss']
})
export class DocsStartJavascriptComponent implements AfterViewChecked {

  private highlighted: boolean;
  public apiColumns: Array<string>;
  public apiColumnsWithDefault: Array<string>;
  public apiConstructorData: Array<ApiTableRow>;
  public apiHandleErrorData: Array<ApiTableRow>;
  public apiHandleStateData: Array<ApiTableRow>;
  public botTicTacToeExample: string;
  public botPlanetWarsExample: string;

  constructor(
    private highlightService: HighlightService,
    private httpService: HttpService,
    private scrollService: ScrollService,
  ) {
    this.highlighted = false;
    this.apiColumns = ['argument', 'type', 'description'];
    this.apiColumnsWithDefault = ['argument', 'type', 'default', 'description'];
    this.apiConstructorData = [
      {argument: 'game',            type: 'string',  default: '-',                            description: 'The game your bot is made for'},
      {argument: 'name',            type: 'string',  default: '-',                            description: 'The name of your bot'},
      {argument: 'sendSilentState', type: 'boolean', default: 'false',                        description: 'Whether or not your bot will receive state messages that do not expect an answer'},
      {argument: 'endpoint',        type: 'string',  default: 'ws://api.wartemis.com/socket', description: 'What endpoint to connect to'},
    ];
    this.apiHandleErrorData = [
      {argument: 'error', type: 'string', description: 'The error message'},
    ];
    this.apiHandleStateData = [
      {argument: 'state', type: 'string',  description: 'The game state'},
      {argument: 'move',  type: 'boolean', description: 'If you are expected to move on this state'},
      {argument: 'game',  type: 'string',  description: 'The game id, this is public information and is sent to each bot in a game'},
      {argument: 'key',   type: 'string',  description: 'The bot id, this is private information and is unique for each bot in a game'},
    ];
    this.loadBotPlanetWarsExample();
    this.loadBotTicTacToeExample();
  }

  ngAfterViewChecked() {
    if(this.highlighted) {
      return;
    }
    if(!this.botPlanetWarsExample || !this.botTicTacToeExample) {
      return;
    }
    this.highlighted = true;
    this.highlightService.highlightAll();
  }

  public scroll(target: string): void {
    this.scrollService.scroll(target, 'docs-scroll');
  }

  private loadBotPlanetWarsExample(): void {
    this.httpService
      .getText('https://raw.githubusercontent.com/Project-Wartemis/bot-planet-wars/master/src/index.ts')
      .subscribe(snippet => {
        this.botPlanetWarsExample = snippet;
      });
  }

  private loadBotTicTacToeExample(): void {
    this.httpService
      .getText('https://raw.githubusercontent.com/Project-Wartemis/bot-tic-tac-toe/master/src/index.ts')
      .subscribe(snippet => {
        this.botTicTacToeExample = snippet;
      });
  }

}
