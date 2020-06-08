import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  getAssetRoot(): string {
    return '/assets/';
  }

  getHttpRoot(): string {
    return environment.http_root;
  }

  getWsRoot(): string {
    return environment.ws_root;
  }

  getAssetUrl(path: string): string {
    return this.getAssetRoot() + path;
  }

  getHttpUrl(path: string): string {
    return this.getHttpRoot() + path;
  }

  getWsUrl(): string {
    return this.getWsRoot() + 'socket';
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.getHttpUrl(path));
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.getHttpUrl(path), body);
  }

  getAsset(path: string): Observable<string> {
    return this.http.get(this.getAssetUrl(path), { responseType: 'text' });
  }
}
