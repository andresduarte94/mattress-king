import { Injectable, Inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DOCUMENT } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class ScrollService {

  constructor(@Inject(DOCUMENT) private document: HTMLDocument, private viewportScroller: ViewportScroller) { }

  scrollToElementById(elementId: string) {
    let productsContainerEl = this.document.getElementById(elementId);

    const positionY = window.scrollY + productsContainerEl.getBoundingClientRect().top;
    this.viewportScroller.scrollToPosition([0, positionY]);
  }
}