import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { GameState, GameStateInternal, Link, LinkInternal, Move, Node, NodeInternal } from 'interfaces/game/conquest';

@Injectable()
export class GameConquestStateService {

  public gameState$: BehaviorSubject<GameStateInternal>;

  constructor() {
    this.gameState$ = new BehaviorSubject<GameStateInternal>(null);
  }

  public processNewState(gameState: GameState): void {
    const result = this.getCurrentGameState();

    result.players = gameState.players;

    if(!result.nodes.length) {
      result.nodes = this.getNodes(gameState.nodes);
    }

    if(!result.links.length) {
      result.links = this.getLinks(gameState.links);
    } else {
      result.links = result.links.filter(l => !l.isMove);
    }

    if(!result.nodes[0].links.length) {
      this.generateNodeLinks(result.nodes, result.links);
    }

    result.events = gameState.events;

    result.links = result.links.concat(this.getLinksFromMoves(result.events.moves));

    this.gameState$.next(result);
  }

  public getCurrentGameState(): GameStateInternal {
    if(this.gameState$.getValue()) {
      return this.gameState$.getValue();
    }
    return {
      players: [],
      nodes: [],
      links: [],
      events: {
        deploys: [],
        moves: []
      }
    } as GameStateInternal;
  }

  private getNodes(nodes: Array<Node>): Array<NodeInternal> {
    return nodes.map(node => ({
      id: node.id,
      name: node.name,
      owner: node.owner,
      power: node.power,
      links: []
    } as NodeInternal));
  }

  private getLinks(links: Array<Link>): Array<LinkInternal> {
    return links.map(link => ({
      source: link.source,
      target: link.target,
      isMove: false,
      power: 0
    } as LinkInternal));
  }

  private generateNodeLinks(nodes: Array<NodeInternal>, links: Array<LinkInternal>): void {
    for(const link of links) {
      const source = nodes.find(n => n.id === link.source);
      const target = nodes.find(n => n.id === link.target);
      if(!source || !target) {
        console.log('nodes', nodes);
        console.log('links', links);
        console.log('link', link);
        console.log('source', source);
        console.log('target', target);
      }
      source.links.push(target);
      target.links.push(source);
    }
  }

  private getLinksFromMoves(moves: Array<Move>): Array<LinkInternal> {
    return moves.map(move => ({
      source: move.source,
      target: move.target,
      isMove: true,
      power: move.power,
    } as LinkInternal));
  }

}
