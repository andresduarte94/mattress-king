import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../post.model';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  postImageSize: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  createBreakpointsSubscription() {
    // Set product image url and update the change
    return this.breakpointObserver
      .observe(['(max-width: 1370px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 1370px)']) {
          this.postImageSize = '-small';
        }
        else {
          this.postImageSize = '-medium';
        }
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
