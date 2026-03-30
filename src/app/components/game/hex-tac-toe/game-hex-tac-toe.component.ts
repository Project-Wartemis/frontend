import * as d3 from 'd3';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Player } from 'interfaces/base';
import { Placement, PlayerSymbol, State, Stone } from 'interfaces/game/hex-tac-toe';
import { GameHexTacToeStateService } from 'services/game/hex-tac-toe/game-hex-tac-toe-state.service';

interface RenderStone extends Stone {
  x: number;
  y: number;
  winning: boolean;
}

interface RenderCell extends Placement {
  x: number;
  y: number;
}

@Component({
  selector: 'app-game-hex-tac-toe',
  templateUrl: './game-hex-tac-toe.component.html',
  styleUrls: ['./game-hex-tac-toe.component.scss']
})
export class GameHexTacToeComponent implements OnChanges {

  @Input() players: Player[] = [];
  @Input() speed: number;
  @Input() playing: boolean;
  @Output() done: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('display') display: ElementRef;

  private readonly hexRadius = 1;

  private state: State;
  private renderInitialised = false;
  private turnDuration = 1000;
  private turnStarted: number;
  private renderTimeout;

  constructor(
    private stateService: GameHexTacToeStateService,
  ) {
    this.stateService.state$.subscribe(this.update.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.speed && changes.speed.previousValue !== this.speed) {
      this.turnDuration = (130 - this.speed) * (130 - this.speed) / 16;
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
      return;
    }
    const element = this.display.nativeElement;

    d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .attr('preserveAspectRatio', 'xMidYMid meet');

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

    const bounds = this.computeBounds();
    const width = Math.max(6, bounds.maxX - bounds.minX + 4);
    const height = Math.max(6, bounds.maxY - bounds.minY + 4);

    svg.attr('viewBox', `${bounds.minX - 2} ${bounds.minY - 2} ${width} ${height}`);

    const cells = this.buildCells();
    const cellPoints = this.hexPoints();

    const cellSelection = svg.selectAll('polygon.cell').data(cells, d => d ? (d as RenderCell).q + ',' + (d as RenderCell).r : '');
    const cellEnter = cellSelection.enter().append('polygon').attr('class', 'cell');

    cellSelection.merge(cellEnter)
      .attr('points', d => this.translatePoints(cellPoints, d.x, d.y))
      .attr('fill', '#f7f7f7')
      .attr('stroke', '#d7d7d7')
      .attr('stroke-width', 0.04);

    cellSelection.exit().remove();

    const winningKeys = new Set((this.state.winningLine?.cells || []).map(c => this.toKey(c.q, c.r)));
    const stones: Array<RenderStone> = this.state.stones.map(stone => {
      const center = this.hexToPixel(stone.q, stone.r);
      return {
        ...stone,
        x: center.x,
        y: center.y,
        winning: winningKeys.has(this.toKey(stone.q, stone.r))
      };
    });

    const stoneSelection = svg.selectAll('g.stone').data(stones, d => d ? (d as RenderStone).q + ',' + (d as RenderStone).r : '');
    const stoneEnter = stoneSelection.enter().append('g').attr('class', 'stone');
    stoneEnter.append('circle');
    stoneEnter.append('text');

    const merged = stoneSelection.merge(stoneEnter);
    merged.select('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', this.hexRadius * 0.58)
      .attr('fill', d => this.getColorBySymbol(d.symbol))
      .attr('stroke', d => d.winning ? '#ffd54f' : '#222222')
      .attr('stroke-width', d => d.winning ? 0.14 : 0.06);

    merged.select('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y + 0.12)
      .attr('font-size', 0.9)
      .attr('font-weight', 700)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .text(d => d.symbol);

    stoneSelection.exit().remove();

    callback();
  }

  private buildCells(): Array<RenderCell> {
    if(!this.state.stones.length) {
      return this.buildCellRange(-4, 4, -4, 4);
    }

    const qValues = this.state.stones.map(s => s.q);
    const rValues = this.state.stones.map(s => s.r);

    const padding = 3;
    return this.buildCellRange(
      Math.min(...qValues) - padding,
      Math.max(...qValues) + padding,
      Math.min(...rValues) - padding,
      Math.max(...rValues) + padding,
    );
  }

  private buildCellRange(minQ: number, maxQ: number, minR: number, maxR: number): Array<RenderCell> {
    const cells: Array<RenderCell> = [];
    for(let q = minQ; q <= maxQ; q++) {
      for(let r = minR; r <= maxR; r++) {
        const c = this.hexToPixel(q, r);
        cells.push({ q, r, x: c.x, y: c.y });
      }
    }
    return cells;
  }

  private computeBounds(): { minX: number; maxX: number; minY: number; maxY: number } {
    const cells = this.buildCells();
    const xs = cells.map(c => c.x);
    const ys = cells.map(c => c.y);
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }

  private hexToPixel(q: number, r: number): { x: number; y: number } {
    const x = Math.sqrt(3) * (q + r / 2) * this.hexRadius;
    const y = 1.5 * r * this.hexRadius;
    return { x, y };
  }

  private hexPoints(): Array<[number, number]> {
    const points: Array<[number, number]> = [];
    for(let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      points.push([
        this.hexRadius * Math.cos(angle),
        this.hexRadius * Math.sin(angle)
      ]);
    }
    return points;
  }

  private translatePoints(points: Array<[number, number]>, x: number, y: number): string {
    return points.map(p => `${p[0] + x},${p[1] + y}`).join(' ');
  }

  private toKey(q: number, r: number): string {
    return `${q},${r}`;
  }

  private getColorBySymbol(symbol: PlayerSymbol): string {
    return this.players['XO'.indexOf(symbol)]?.color || (symbol === 'X' ? '#4f46e5' : '#ef4444');
  }

}
