import { Injectable } from '@angular/core';

import { GameState, GameStateInternal, Link, LinkInternal, Move, Node, NodeInternal, Player } from 'interfaces/game/conquest';

@Injectable({
  providedIn: 'root'
})
export class GameConquestMockService {

  private PLAYER_COUNT = 3;
  private NODE_COUNT = 20;

  constructor() { }

  public generateInitial(): GameState {
    const players = [...Array(this.PLAYER_COUNT).keys()].map(i => ({
      id: i,
      name: 'player' + i,
      power: 1
    } as Player));

    const nodes = [...Array(this.NODE_COUNT).keys()].map(i => ({
      id: i,
      name: 'node' + i,
      owner: Math.max(-1, i - this.NODE_COUNT + this.PLAYER_COUNT), // last nodes assigned to a player
      power: 2
    } as Node));

    const links = [...Array(this.NODE_COUNT).keys()].filter(i => i).map(i => ({
      source: i,
      target: Math.floor(Math.random() * i)
    } as Link));

    return {
      players,
      nodes,
      links,
      events: {
        deploys: [],
        moves: []
      }
    } as GameState;
  }

  public generate(gameState: GameStateInternal): GameState {
    // preparation
    const players = gameState.players;
    const nodes = gameState.nodes;
    const links = gameState.links.filter(l => !l.isMove).map(l => l as Link);
    const events = gameState.events;
    // deploys
    events.deploys = [];
    for(const player of players) {
      player.power = nodes.filter(n => n.owner === player.id).length;
      if(player.power === 0) {
        continue; // if the player is dead
      }
      const target = this.randomNodeOfPlayer(nodes, player);
      events.deploys.push({
        target: target.id,
        power: player.power,
      });
      target.power += player.power;
    }
    // moves
    events.moves = [];
    for(const player of players) {
      const playerNodes = nodes.filter(n => n.owner === player.id);
      for(const source of playerNodes) {
        const target = this.randomLinkedNode(source);
        const power = Math.floor(source.power / 2);
        source.power -= power;
        target.power += power * (source.owner === target.owner ? 1 : -1);
        if(target.power === 0) {
          target.owner = -1;
        }
        if(target.power < 0) {
          target.owner = source.owner;
          target.power *= -1;
        }
        events.moves.push({
          source: source.id,
          target: target.id,
          power,
        } as Move);
        links.push({
          source: source.id,
          target: target.id,
          isMove: true,
          power,
        } as LinkInternal);
      }
    }
    return {
      players,
      nodes: nodes.map(n => n as Node),
      links: links.map(l => l as Link),
      events
    } as GameState;
  }

  private randomNodeOfPlayer(nodes: Array<NodeInternal>, player: Player): NodeInternal {
    const playerNodes = nodes.filter(n => n.owner === player.id);
    return playerNodes[Math.floor(Math.random() * playerNodes.length)];
  }

  private randomLinkedNode(node: NodeInternal): NodeInternal {
    return node.links[Math.floor(Math.random() * node.links.length)];
  }
}
