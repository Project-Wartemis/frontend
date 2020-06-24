import * as d3 from 'd3';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Player } from 'interfaces/base';
import { State } from 'interfaces/game/tic-tac-toe';
import { GameTicTacToeStateService } from 'services/game/tic-tac-toe/game-tic-tac-toe-state.service';

@Component({
  selector: 'app-game-tic-tac-toe',
  templateUrl: './game-tic-tac-toe.component.html',
  styleUrls: ['./game-tic-tac-toe.component.scss']
})
export class GameTicTacToeComponent implements OnChanges {
  @Input() players: Player[] = [];
  @Input() speed: number;
  @Input() playing: boolean;
  @Output() done: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('display') display: ElementRef;

  private state: State;
  private renderInitialised = false;
  private turnDuration = 1000;
  private turnStarted: number;
  private renderTimeout;

  constructor(
    private stateService: GameTicTacToeStateService,
  ) {
    this.stateService.state$.subscribe(this.update.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.speed && changes.speed.previousValue !== this.speed) {
      this.turnDuration = (130 - this.speed) * (130 - this.speed) / 16; // between ~50ms and ~1s
      // check if our current turn would have already finished should we have had this speed
      if(new Date().getTime() > this.turnStarted + this.turnDuration) {
        clearTimeout(this.renderTimeout);
        setTimeout(() => {
          this.done.emit();
        });
      }
    }
  }

  private update(state: State): void {
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
      .attr('viewBox', `0 0 10 10`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('line')
      .data([[4, 2, 4, 8], [6, 2, 6, 8], [2, 4, 8, 4], [2, 6, 8, 6]])
      .enter()
      .append('line')
        .attr('style', 'stroke:grey; stroke-width:0.05; stroke-linecap: round')
        .attr('x1', d => d[0])
        .attr('y1', d => d[1])
        .attr('x2', d => d[2])
        .attr('y2', d => d[3]);

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

    const positionsAll = this.state.board.split('').map((symbol, i) => ({
      i,
      symbol,
      x: (i % 3) * 2 + 3,
      y: Math.floor(i / 3) * 2 + 3
    }));

    const positionsX = positionsAll.filter(p => p.symbol === 'X');
    const positionsO = positionsAll.filter(p => p.symbol === 'O');

    const elementsX = svg.selectAll('g.x').data(positionsX).enter().append('g').attr('class', 'x');
    const elementsO = svg.selectAll('g.o').data(positionsO).enter().append('g').attr('class', 'o');

    const colorX = this.getColorBySymbol('X');
    const colorO = this.getColorBySymbol('O');

    elementsX.append('line')
      .attr('style', `stroke:${colorX}; stroke-width:0.15`)
      .attr('x1', d => d.x - .65)
      .attr('y1', d => d.y - .65)
      .attr('x2', d => d.x + .65)
      .attr('y2', d => d.y + .65);

    elementsX.append('line')
      .attr('style', `stroke:${colorX}; stroke-width:0.15`)
      .attr('x1', d => d.x - .65)
      .attr('y1', d => d.y + .65)
      .attr('x2', d => d.x + .65)
      .attr('y2', d => d.y - .65);

    elementsO.append('circle')
      .attr('r', .65)
      .attr('stroke', colorO)
      .attr('fill', 'none')
      .attr('stroke-width', .15)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    callback();
  }

  private getColorBySymbol(symbol: string): string {
    return this.players['XO'.indexOf(symbol)]?.color || '#000000';
  }

}
