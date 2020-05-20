import ForceGraph from 'force-graph';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { GameStateInternal } from 'interfaces/game/conquest';
import { ColorService } from 'services/color/color.service';
import { GameConquestStateService } from 'services/game/conquest/game-conquest-state.service';

@Component({
  selector: 'app-game-conquest',
  templateUrl: './game-conquest.component.html',
  styleUrls: ['./game-conquest.component.scss'],
})
export class GameConquestComponent implements AfterViewInit {

  @ViewChild('display') display: ElementRef;

  private graph: any;
  private animationStarted = false;
  private animationStopped = false;
  private state: GameStateInternal;

  constructor(
    private colorService: ColorService,
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
    let color = this.state.players.findIndex(p => p.id === node.owner) + 1;
    if(node.owner === -1) {
      color = 0;
    }
    ctx.fillStyle = this.colorService.getColor(color);
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

}
