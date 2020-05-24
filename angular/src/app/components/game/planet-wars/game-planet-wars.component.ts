import * as d3 from 'd3';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Client } from 'interfaces/base';
import { StateInternal } from 'interfaces/game/planet-wars';
import { GamePlanetWarsStateService } from 'services/game/planet-wars/game-planet-wars-state.service';

// this looks good when the coordinates are within a range of 50
// TODO allow this to change with a slider?
const RADIUS = 1;

@Component({
  selector: 'app-game-planet-wars',
  templateUrl: './game-planet-wars.component.html',
  styleUrls: ['./game-planet-wars.component.scss']
})
export class GamePlanetWarsComponent implements OnChanges {

  @Input() players: Client[] = [];
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
    private stateService: GamePlanetWarsStateService,
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

    const rangeX = d3.extent(this.state.planets, p => p.x);
    const rangeY = d3.extent(this.state.planets, p => p.y);

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .attr('viewBox', `${rangeX[0] - 4 * RADIUS} ${rangeY[0] - 4 * RADIUS} ${rangeX[1] - rangeX[0] + 8 * RADIUS} ${rangeY[1] - rangeY[0] + 8 * RADIUS}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const defs = svg.append('defs');

    const gradient = defs.selectAll('radialGradient')
      .data(this.state.players)
      .enter()
      .append('radialGradient')
        .attr('id', d => 'gradient' + d)
        .attr('cx', '50%').attr('cy', '50%')
        .attr('fx', '30%').attr('fy', '30%')
        .attr('r', '50%');

    gradient.append('stop').attr('stop-color', d => this.getColorByPlayerId(d)).attr('offset', '10%');
    gradient.append('stop').attr('stop-color', '#222222').attr('offset', '100%');

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

    const planets = svg.selectAll('g.planet').data(this.state.planets);

    const newPlanets = planets.enter().append('g').attr('class', 'planet');

    newPlanets.append('circle')
      .attr('r', RADIUS)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    newPlanets.append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '1px')
      .attr('x', d => d.x)
      .attr('y', d => d.y + 2 * RADIUS);

    planets.merge(newPlanets).select('circle')
      .attr('fill', d => `url(#gradient${d.player})`);
    planets.merge(newPlanets).select('text')
      .text(d => d.ships);

    planets.exit().remove();

    const moves = svg.selectAll('polygon').data(this.state.moves, d => d ? (d as any).id : (this as any).id);
    const newMoves = moves.enter().append('polygon')
      .attr('stroke-width', .05)
      .attr('stroke', 'black')
      .attr('fill', d => this.getColorByPlayerId(d.player))
      // put this at the value it's supposed to be when creating it, else the animation looks silly
      .attr('transform', d => `rotate(${d.angle} ${d.x} ${d.y})`);

    moves.merge(newMoves)
      .transition()
      .ease(d3.easeLinear)
      .duration(this.playing ? this.turnDuration : 0)
      .attr('points', d => `${d.x - .1},${d.y} ${d.x - .2},${d.y + .3} ${d.x + .2},${d.y} ${d.x - .2},${d.y - .3}`)
      .attr('transform', d => `rotate(${d.angle} ${d.x} ${d.y})`);

    moves.exit().remove();

    callback();
  }

  private getColorByPlayerId(id: number): string {
    return this.players.find(b => b.id === id)?.color || '#000000';
  }

}
