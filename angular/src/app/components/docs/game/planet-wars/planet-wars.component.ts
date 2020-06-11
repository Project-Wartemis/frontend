import { AfterViewChecked, Component } from '@angular/core';

import { HighlightService } from 'services/highlight/highlight.service';
import { HttpService } from 'services/http/http.service';

@Component({
  selector: 'app-docs-game-planet-wars',
  templateUrl: './planet-wars.component.html',
  styleUrls: ['./planet-wars.component.scss']
})
export class DocsGamePlanetWarsComponent implements AfterViewChecked {

  private highlighted: boolean;
  public actionExample: string;
  public actionStructure: string;
  public stateExample: string;
  public stateStructure: string;

  constructor(
    private highlightService: HighlightService,
    private httpService: HttpService,
  ) {
    this.highlighted = false;
    this.loadActionExample();
    this.loadActionStructure();
    this.loadStateExample();
    this.loadStateStructure();
  }

  ngAfterViewChecked() {
    if(this.highlighted) {
      return;
    }
    if(!this.actionExample || !this.actionStructure || !this.stateExample || !this.stateStructure) {
      return;
    }
    this.highlighted = true;
    this.highlightService.highlightAll();
  }

  private loadActionExample(): void {
    this.httpService
      .getAsset('snippets/planet-wars-action-example.json')
      .subscribe(snippet => {
        this.actionExample = snippet;
      });
  }

  private loadActionStructure(): void {
    this.httpService
      .getAsset('snippets/planet-wars-action-structure.ts')
      .subscribe(snippet => {
        this.actionStructure = snippet;
      });
  }

  private loadStateExample(): void {
    this.httpService
      .getAsset('snippets/planet-wars-state-example.json')
      .subscribe(snippet => {
        this.stateExample = snippet;
      });
  }

  private loadStateStructure(): void {
    this.httpService
      .getAsset('snippets/planet-wars-state-structure.ts')
      .subscribe(snippet => {
        this.stateStructure = snippet;
      });
  }

}
