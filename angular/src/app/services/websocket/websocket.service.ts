import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { v4 as uuid } from 'uuid';

import { ErrorMessage, Message, RegisterMessage } from 'interfaces/message';
import { HttpService } from 'services/http/http.service';
import { SessionService } from 'services/session/session.service';
import { SnackbarService } from 'services/snackbar/snackbar.service';

type Socket = Subject<object>;
type MessageHandler = (raw: object) => void;
type MessageHandlerWrapper = {
  key: string;
  type: string;
  handler: MessageHandler;
};

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket;
  private handlers: Set<MessageHandlerWrapper> = new Set();
  private registered = false;

  constructor(
    private http: HttpService,
    private sessonService: SessionService,
    private snackbarService: SnackbarService,
  ) {
    this.sessonService.name$.subscribe(name => {
      if(!name || !this.registered) {
        return;
      }
      this.register();
    });
    this.socket = webSocket(this.http.getWsUrl());
    this.socket.subscribe(this.handleMessage.bind(this));
    this.registerMessageHandler('connected',  this.handleConnectedMessage.bind(this));
    this.registerMessageHandler('error',      this.handleErrorMessage.bind(this));
    this.registerMessageHandler('registered', this.handleRegisteredMessage.bind(this));
  }

  public registerMessageHandler(type: string, handler: MessageHandler): string {
    const key = uuid();
    this.handlers.add({
      key,
      type,
      handler
    } as MessageHandlerWrapper);
    return key;
  }

  public deregisterMessageHandler(key: string): void {
    for(const wrapper of this.handlers) {
      if(wrapper.key === key) {
        this.handlers.delete(wrapper);
        return;
      }
    }
    console.error(`No handler found for key [${key}]. This is unexpected.`);
  }

  public send(message: object): void {
    this.socket.next(message);
  }

  private register(): void {
    const name = this.sessonService.name$.getValue();
    if(!name) {
      return;
    }
    this.send({
      type: 'register',
      clientType: 'viewer',
      name,
    } as RegisterMessage);
  }

  private handleMessage(raw: object): void {
    const message: Message = Object.assign({} as Message, raw);
    for(const wrapper of this.handlers) {
      if(wrapper.type === message.type) {
        wrapper.handler(raw);
      }
    }
  }

  private handleConnectedMessage(raw: object): void {
    this.register();
  }

  private handleErrorMessage(raw: object): void {
    const message: ErrorMessage = Object.assign({} as ErrorMessage, raw);
    this.snackbarService.error(message.message, message.message);
  }

  private handleRegisteredMessage(raw: object): void {
    this.registered = true;
  }
}
