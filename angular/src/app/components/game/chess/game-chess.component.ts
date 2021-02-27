import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { Player } from 'interfaces/base';
import { StateInternal } from 'interfaces/game/chess';
import { GameChessStateService } from 'services/game/chess/game-chess-state.service';

@Component({
  selector: 'app-game-chess',
  templateUrl: './game-chess.component.html',
  styleUrls: ['./game-chess.component.scss']
})
export class GameChessComponent implements OnChanges {

  @Input() players: Player[] = [];
  @Input() speed: number;
  @Input() playing: boolean;
  @Output() done: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('display') display: ElementRef;

  private state: StateInternal;
  private renderInitialised = false;
  private turnDuration = 1000;
  private turnStarted: number;
  private renderTimeout;

  constructor(
    private stateService: GameChessStateService,
  ) {
    this.stateService.state$.subscribe(this.update.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.speed && changes.speed.previousValue !== this.speed) {
      this.turnDuration = (130 - this.speed) * (130 - this.speed) / 5; // between ~200ms and ~3.4s
      // check if our current turn would have already finished should we have had this speed
      if(new Date().getTime() > this.turnStarted + this.turnDuration) {
        clearTimeout(this.renderTimeout);
        setTimeout(() => {
          this.done.emit();
        });
      }
    }
  }

  private update(state: StateInternal): void {
    if(!state) {
      return;
    }
    this.state = state;
    this.render(() => {
      this.turnStarted = new Date().getTime();
      this.renderTimeout = setTimeout(() => {
        this.done.emit();
      }, this.turnDuration);
    });
  }

  private initialRender(): void {
    if(!this.display) {
      return; // skip this render step
    }
    const element = this.display.nativeElement;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .attr('viewBox', `-1 -1 10 10`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const data = [];
    data.push([-0.1, -0.1, 8.2, 8.2, '#525252']);
    data.push([0, 0, 8, 8, '#ab5252']);
    for(let i = 0; i < 32; i++) {
      const y = Math.floor(i / 4);
      const x = 2 * (i % 4) + y % 2;
      data.push([x, y, 1, 1, 'white']);
    }

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
        .attr('x', d => d[0])
        .attr('y', d => d[1])
        .attr('width', d => d[2])
        .attr('height', d => d[3])
        .attr('style', d => `fill: ${d[4]}`);

    console.log('initialised');
    this.renderInitialised = true;
  }

  private render(callback: () => void): void {
    if(!this.renderInitialised) {
      this.initialRender();
      setTimeout(this.render.bind(this, callback), 200);
      return;
    }
    const element = this.display.nativeElement;

    const svg = d3.select(element).select('svg');

    const pieces = svg.selectAll('text').data(this.state.pieces, d => d ? (d as any).id : (this as any).id);
    const newPieces = pieces.enter()
      .append('text')
        .attr('style', 'font-size:1; text-anchor:middle; alignment-baseline:middle')
        .attr('x', d => d.x + 0.5)
        .attr('y', d => d.y + 0.6)
        .text(d => d.code);
    pieces.exit().remove();

    callback();
  }

}
