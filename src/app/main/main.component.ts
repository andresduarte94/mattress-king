import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products/products.service';
import { Product } from './products/product.model';
import { BlogService } from '../blog/blog.service';
import { Post } from '../blog/post.model';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  carousel: any;
  coverProducts: Product[] = [];
  posts: Post[];
  postImageSize: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(private productsService: ProductsService, private blogService: BlogService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.coverProducts.push(...[this.productsService.getProductById(19, 'es'), this.productsService.getProductById(14, 'es')]);
    this.posts = this.blogService.getPosts();

    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  ngAfterViewInit() {
    //Initialize carousel
    this.carousel = (<any>$('.carousel')).carousel({
      interval: 4000,
      pause: "hover",
      touch: true
    }).carousel('cycle');
  }

  next() {
    this.carousel.carousel('next');
  }

  prev() {
    this.carousel.carousel('prev');
  }

  selectPost(index: number) {
    this.carousel.carousel(index);
  }

  createBreakpointsSubscription() {
    // Set product image url and update the change
    return this.breakpointObserver
      .observe(['(max-width: 450px)', '(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 450px)']) {
          this.postImageSize = '-small';
        }
        else if (state.breakpoints['(max-width: 790px)']) {
          this.postImageSize = '-medium';
        }
        else {
          this.postImageSize = '-large';
        }
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
