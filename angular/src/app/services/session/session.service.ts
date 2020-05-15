import { v4 as uuid } from 'uuid';

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public name$: BehaviorSubject<string>;
  public key: string;

  constructor(
  ) {
    this.name$ = new BehaviorSubject<string>(localStorage.getItem('SESSION_NAME'));
    this.key = uuid();
  }

  public setName(name: string): void {
    this.name$.next(name);
    localStorage.setItem('SESSION_NAME', name);
  }
}
