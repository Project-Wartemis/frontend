import ForceGraph from 'force-graph';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Client } from 'interfaces/base';
import { GameStateInternal } from 'interfaces/game/conquest';
import { GameConquestStateService } from 'services/game/conquest/game-conquest-state.service';

@Component({
  selector: 'app-game-conquest',
  templateUrl: './game-conquest.component.html',
  styleUrls: ['./game-conquest.component.scss'],
})
export class GameConquestComponent implements AfterViewInit {

  @Input() bots: Client[];
  @Input() playing: boolean;
  @Input() speed: number;
  @Output() done: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('display') display: ElementRef;

  private graph: any;
  private animationStarted = false;
  private animationStopped = false;
  private state: GameStateInternal;

  constructor(
    private stateService: GameConquestStateService,
  ) { }

  ngAfterViewInit(): void {
    window.setTimeout(this.initGraph.bind(this), 50);
  }

  private initGraph(): void {
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
      .linkDirectionalParticles((l: any) => l.isMove ? 1 : 0)
      .linkDirectionalParticleSpeed(1 / 60)
      .cooldownTime(2000)
      .linkCurvature((l: any) => l.isMove ? .5 : 0)
      .onEngineStop(this.postAnimationStopped.bind(this))
      .nodeCanvasObject(this.drawNode.bind(this));
    this.stateService.gameState$.subscribe(this.update.bind(this));
  }

  private update(newState: GameStateInternal): void {
    if(!newState) {
      return;
    }
    if(this.animationStarted && !this.animationStopped) {
      return;
    }
    this.state = newState;
    this.animationStarted = true;
    this.graph.graphData(newState);
  }

  private postAnimationStopped(): void {
    if(this.animationStopped) {
      return;
    }
    this.animationStopped = true;
    this.graph
      .zoomToFit(400)
      .d3AlphaMin(2); // this prevents moving the nodes from now on
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
    return this.bots.find(b => b.id === id)?.color || '#000000';
  }

}
