import { v4 as uuid } from 'uuid';

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

import { ErrorMessage, Message, RegisterMessage } from 'interfaces/message';
import { HttpService } from 'services/http/http.service';
import { SessionService } from 'services/session/session.service';
import { SnackbarService } from 'services/snackbar/snackbar.service';

type Socket = Subject<object>;
type MessageHandler = (key: string, raw: object) => void;
type SocketHandlers = { [key: string]: MessageHandler };
type Handlers = { [key: string]: SocketHandlers };

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private sockets: {[key: string]: Socket} = {};
  private handlers: Handlers = {};

  constructor(
    private http: HttpService,
    private sessonService: SessionService,
    private snackbarService: SnackbarService,
  ) {
    this.sessonService.name$.subscribe(name => {
      if(!name) {
        return;
      }
      for(const key of Object.keys(this.sockets)) {
        this.register(key);
      }
    });
  }

  public connect(path: string): string {
    const key = uuid();
    const socket = this.createWebSocket(path);
    this.sockets[key] = socket;

    socket.subscribe(this.handleMessage.bind(this, key));
    this.registerMessageHandler(key, 'error',   this.handleErrorMessage.bind(this));
    this.registerMessageHandler(key, 'connect', this.register.bind(this, key));

    return key;
  }

  public disconnect(key: string): void {
    if(!(key in this.sockets)) {
      console.error('No socket found. This is unexpected.');
    }
    this.sockets[key].complete();
    delete this.sockets[key];
    delete this.handlers[key];
  }

  public registerMessageHandler(key: string, type: string, handler: MessageHandler): void {
    if(!(key in this.handlers)) {
      this.handlers[key] = {};
    }
    this.handlers[key][type] = handler;
  }

  public send(key: string, message: object): void {
    if(!(key in this.sockets)) {
      console.error('No socket found. This is unexpected.');
    }
    this.sockets[key].next(message);
  }

  private register(key: string): void {
    const name = this.sessonService.name$.getValue();
    if(!name) {
      return;
    }
    this.send(key, {
      type: 'register',
      clientType: 'viewer',
      name,
      key: this.sessonService.key,
    } as RegisterMessage);
  }

  private createWebSocket(path: string): Socket {
    const socket: Socket = webSocket(this.http.getWsUrl(path));
    socket.subscribe(data => {
      console.log('incoming', data);
    });
    return socket;
  }

  private handleMessage(key: string, raw: object): void {
    if(!(key in this.sockets)) {
      console.error('No socket found. This is unexpected.');
      return;
    }
    if(!(key in this.handlers)) {
      console.log('No handlers found for socket, ignoring');
      return;
    }
    const message: Message = Object.assign({} as Message, raw);
    if(!(message.type in this.handlers[key])) {
      console.log(`No handlers found for socket for type [${message.type}], ignoring`);
      return;
    }
    this.handlers[key][message.type](key, raw);
  }

  private handleErrorMessage(key: string, raw: object): void {
    const message: ErrorMessage = Object.assign({} as ErrorMessage, raw);
    this.snackbarService.error(message.message, message.message);
  }
}
