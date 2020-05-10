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

  getRoot(): string {
    console.log(environment.api_url);
    return environment.api_url;
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.getRoot() + path);
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.getRoot() + path, body);
  }
}
