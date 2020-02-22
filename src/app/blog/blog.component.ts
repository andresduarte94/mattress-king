import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';
import { Subject } from 'rxjs';
import { GlobalService } from '../shared/global.service';
import { Params, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  // Global variables
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;

  // Banner posts variables
  postIndexes: number[] = [0, 1, 2];
  bannerPosts: Post[] = [];
  currentPost: Post;
  showingIndex: number = 0;
  carousel: any;
  nextPost = new Subject();

  constructor(private globalService: GlobalService, private blogService: BlogService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Global variables initialization
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['blog'];
    //Banner posts variables initialization
    this.postIndexes.forEach(postIndex => {
      this.bannerPosts.push(this.blogService.getPostById(postIndex));
    })
    this.currentPost = this.bannerPosts.slice(0, 1)[0];
    this.nextPost.subscribe((post: Post) => {
      this.currentPost = post;
    });

    //Params subscription for updating language
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Update language and translation words
        this.language = params.language;
        this.globalService.setLanguage(this.language);
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['blog'];
        this.globalService.updateSubComponentLanguage.next(this.componentWords);
      });
  }

  ngAfterViewInit() {
    //Initialize carousel
    this.carousel = (<any>$('.carousel')).carousel({
      interval: 4000,
      pause: "hover",
      touch: true
    }).carousel('cycle');
    //Update banner post on carousel slid event
    this.carousel.on('slid.bs.carousel', (e: { direction: string; to: number; }) => {
      this.showingIndex = e.to;
      let currentPost = this.bannerPosts.slice(this.showingIndex, this.showingIndex + 1)[0];
      this.nextPost.next(currentPost);
    })
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
}
