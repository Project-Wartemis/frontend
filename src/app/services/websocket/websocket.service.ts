import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { v4 as uuid } from 'uuid';

import { ErrorMessage, Message, RegisterMessage } from 'interfaces/message';
import { HttpService } from 'services/http/http.service';
import { SessionService } from 'services/session/session.service';
import { SnackbarService } from 'services/snackbar/snackbar.service';

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

  private socket: Subject<object>;
  private handlers: Set<MessageHandlerWrapper> = new Set();
  public registered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpService,
    private sessonService: SessionService,
    private snackbarService: SnackbarService,
  ) {
    this.sessonService.name$.subscribe(name => {
      if(!name || !this.registered.getValue()) {
        return;
      }
      this.register();
    });
    this.socket = webSocket(this.http.getWsUrl());
    this.connect();
    this.registerMessageHandler('connected',  this.handleConnectedMessage.bind(this));
    this.registerMessageHandler('error',      this.handleErrorMessage.bind(this));
    this.registerMessageHandler('registered', this.handleRegisteredMessage.bind(this));
  }

  private connect(): void {
    console.log('Connecting');
    this.socket.subscribe({
      next: this.handleMessage.bind(this),
      error: this.delayedConnect.bind(this),
      complete: this.delayedConnect.bind(this)
    });
  }

  private delayedConnect(): void {
    this.registered.next(false);
    console.log('Disconnected... retrying in 5s');
    setTimeout(this.connect.bind(this), 5000);
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
    this.registered.next(true);
  }
}
