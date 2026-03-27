import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { GameState, GameStateInternal, Link, LinkInternal, Move, Node, NodeInternal } from 'interfaces/game/conquest';

@Injectable()
export class GameConquestStateService {

  public gameState$: BehaviorSubject<GameStateInternal>;

  constructor() {
    this.gameState$ = new BehaviorSubject<GameStateInternal>(null);
  }

  public processNewState(raw: object): void {
    const gameState: GameState = Object.assign({} as GameState, raw);

    const result = this.getCurrentGameState();

    if(!result.players.length) {
      result.players = gameState.players;
    }

    if(!result.nodes.length) {
      result.nodes = this.getNodes(gameState.nodes);
    }
    for(const node of gameState.nodes) {
      const resultNode = result.nodes.find(n => n.id === node.id);
      resultNode.owner = node.owner;
      resultNode.power = node.power;
    }

    if(!result.links.length) {
      result.links = this.getLinks(gameState.links);
    } else {
      result.links = result.links.filter(l => !l.isMove);
    }

    result.events = gameState.events;

    if(!result.nodes[0].links.length) {
      this.generateNodeLinks(result); // should only run once
    }

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

  private generateNodeLinks(state: GameStateInternal): void {
    for(const link of state.links) {
      const source = state.nodes.find(n => n.id === link.source);
      const target = state.nodes.find(n => n.id === link.target);
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
