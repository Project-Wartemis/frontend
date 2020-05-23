import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  // https://sashat.me/2017/01/11/list-of-20-simple-distinct-colors/
  // 99% accessibility
  private colors: Array<string> = [
    '#e6194B', '#3cb44b', '#ffe119', '#4363d8',
    '#f58231', '#42d4f4', '#f032e6', '#fabebe', '#469990',
    '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3',
    '#000075', '#a9a9a9', '#ffffff'
  ];

  constructor() { }

  public getColor(i: number): string {
    if(i >= this.colors.length) {
      console.warn(`Tried to access color ${i + 1}, but only ${this.colors.length} available`);
      i = 0;
    }
    return this.colors[i];
  }
}
