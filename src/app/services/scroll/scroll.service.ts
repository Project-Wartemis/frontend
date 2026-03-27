import { Injectable } from '@angular/core';

import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    private scrollToService: ScrollToService
  ) { }

  scroll(target: string, container?: string) {
    this.scrollToService.scrollTo({
      container,
      target,
      duration: 650,
      easing: 'easeOutQuart',
      offset: -20
    } as ScrollToConfigOptions);
  }
}
