import { Injectable, Inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DOCUMENT } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class ScrollService {

  constructor(@Inject(DOCUMENT) private document: HTMLDocument, private viewportScroller: ViewportScroller) { }

  scrollToElementById(elementId: string) {
    let filtersContainerEl = this.document.getElementById(elementId);
    const positionY = window.scrollY + filtersContainerEl.getBoundingClientRect().top - 10;
    this.viewportScroller.scrollToPosition([0, positionY]);
  }
}