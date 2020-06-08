import { Injectable } from '@angular/core';

import 'clipboard';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';

declare var Prism: any;

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor() { }

  highlightAll() {
    Prism.highlightAll();
  }
}
