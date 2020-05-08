import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from "@angular/animations";
import { Post } from 'src/app/blog/post.model';
import { BlogService } from 'src/app/blog/blog.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  slides = [];
  currentSlide = 0;
  slideSize: string;
  language: string;
  posts: Post[];
  intervalId: any;
  // Subscriptions
  breakpointSub: Subscription;

  constructor(public breakpointObserver: BreakpointObserver, private blogService: BlogService, private globalSerivce: GlobalService) { }

  ngOnInit() {
    this.language = this.globalSerivce.getLanguage();
    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
    this.posts = this.blogService.getPosts();

    this.intervalId = setInterval(() => {
      this.onNextClick(); 
    }, 5000);
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.onNextClick(); 
    }, 5000);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.onNextClick(); 
    }, 5000);
  }

  onChangePost(event: any) {
    if(event.fromState == 'void') {
      const postIndex = event.element.id;
      this.blogService.carouselPostChanged.next(postIndex);
    }
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src + '.webp';
      new Image().src = slide.src + '.jpg';
    }
  }

  createBreakpointsSubscription() {
    // Set product image url and update the change
    return this.breakpointObserver
      .observe(['(max-width: 576px)', '(max-width: 970px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 576px)']) {
          this.slideSize = 'small';
        }
        else if (state.breakpoints['(max-width: 970px)']) {
          this.slideSize = 'medium';
        }
        else {
          this.slideSize = 'large';
        }
        this.slides = [
          { src: `https://assets.mattressfinder.shop/v2/assets/posts/post-0-${this.slideSize}` },
          { src: `https://assets.mattressfinder.shop/v2/assets/posts/post-1-${this.slideSize}` },
          { src: `https://assets.mattressfinder.shop/v2/assets/posts/post-2-${this.slideSize}` }
        ];
        this.preloadImages();
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}