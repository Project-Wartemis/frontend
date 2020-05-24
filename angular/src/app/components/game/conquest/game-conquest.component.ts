import ForceGraph from 'force-graph';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Client } from 'interfaces/base';
import { GameStateInternal } from 'interfaces/game/conquest';
import { GameConquestStateService } from 'services/game/conquest/game-conquest-state.service';

@Component({
  selector: 'app-game-conquest',
  templateUrl: './game-conquest.component.html',
  styleUrls: ['./game-conquest.component.scss'],
})
export class GameConquestComponent implements OnChanges {

  @Input() players: Client[] = [];
  @Input() playing: boolean;
  @Input() speed: number;
  @Output() done: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('display') display: ElementRef;

  private state: GameStateInternal;
  private graph: any;
  private renderInitialised = false;
  private animationStopped = false;
  private turnDuration = 1000;
  private turnStarted: number;
  private renderTimeout;

  constructor(
    private stateService: GameConquestStateService,
  ) {
    this.stateService.gameState$.subscribe(this.update.bind(this));
  }

  /*ngAfterViewInit(): void {
    window.setTimeout(this.initGraph.bind(this), 50);
  }*/

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.speed && changes.speed.previousValue !== this.speed) {
      this.turnDuration = (130 - this.speed) * (130 - this.speed) / 4; // between ~200ms and ~4s
      // check if our current turn would have already finished should we have had this speed
      if(new Date().getTime() > this.turnStarted + this.turnDuration) {
        clearTimeout(this.renderTimeout);
        setTimeout(() => {
          this.done.emit();
        });
      }
    }
  }

  private update(state: GameStateInternal): void {
    // new
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
    const width = this.display.nativeElement.offsetWidth;
    const height = this.display.nativeElement.offsetHeight;
    this.graph = ForceGraph()(this.display.nativeElement)
      .width(width - 1)
      .height(height - 1)
      .nodeRelSize(10)
      .enableNodeDrag(false)
      .enableZoomPanInteraction(false)
      // .d3AlphaDecay(0)
      .d3VelocityDecay(0.3)
      .cooldownTime(2000)
      .linkCurvature((l: any) => l.isMove ? .5 : 0)
      .onEngineStop(this.postAnimationStopped.bind(this))
      .nodeCanvasObject(this.drawNode.bind(this))
      .graphData(this.state);

    this.renderInitialised = true;
  }

  private render(callback: () => void): void {
    if(!this.renderInitialised) {
      this.initialRender();
      setTimeout(this.render.bind(this, callback), 200);
      return;
    }
    if(!this.animationStopped) {
      setTimeout(this.render.bind(this, callback), 200);
      return;
    }

    this.graph
      .linkDirectionalParticleSpeed(1000 / 60 / this.turnDuration)
      .graphData(this.state);

    callback();
  }

  private postAnimationStopped(): void {
    if(this.animationStopped) {
      return;
    }
    this.graph
      .zoomToFit(400)
      .d3AlphaMin(2) // this prevents moving the nodes from now on
      .linkDirectionalParticles((l: any) => l.isMove ? 1 : 0)
      .linkDirectionalParticleSpeed(1000 / 60 / this.turnDuration);
    this.animationStopped = true;
  }

  private drawNode(node: any, ctx: CanvasRenderingContext2D): void {
    // circle
    ctx.fillStyle = this.getColorByPlayerId(node.owner);
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    // label
    ctx.fillStyle = '#ffffff';
    ctx.font = '6px Sans-Serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.power, node.x, node.y);
  }

  private getColorByPlayerId(id: number): string {
    return this.players.find(b => b.id === id)?.color || '#000000';
  }

}
