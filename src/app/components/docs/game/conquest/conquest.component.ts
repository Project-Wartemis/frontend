import { AfterViewChecked, Component, } from '@angular/core';

import { HighlightService } from 'services/highlight/highlight.service';
import { HttpService } from 'services/http/http.service';
import { ScrollService } from 'services/scroll/scroll.service';

@Component({
  selector: 'app-docs-game-conquest',
  templateUrl: './conquest.component.html',
  styleUrls: ['./conquest.component.scss']
})
export class DocsGameConquestComponent implements AfterViewChecked {

  private highlighted: boolean;
  public actionExample: string;
  public actionStructure: string;
  public stateExample: string;
  public stateStructure: string;

  constructor(
    private highlightService: HighlightService,
    private httpService: HttpService,
    private scrollService: ScrollService,
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

  public scroll(target: string): void {
    this.scrollService.scroll(target, 'docs-scroll');
  }

  private loadActionExample(): void {
    this.httpService
      .getAsset('snippets/conquest-action-example.json')
      .subscribe(snippet => {
        this.actionExample = snippet;
      });
  }

  private loadActionStructure(): void {
    this.httpService
      .getAsset('snippets/conquest-action-structure.ts')
      .subscribe(snippet => {
        this.actionStructure = snippet;
      });
  }

  private loadStateExample(): void {
    this.httpService
      .getAsset('snippets/conquest-state-example.json')
      .subscribe(snippet => {
        this.stateExample = snippet;
      });
  }

  private loadStateStructure(): void {
    this.httpService
      .getAsset('snippets/conquest-state-structure.ts')
      .subscribe(snippet => {
        this.stateStructure = snippet;
      });
  }

}
