import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../post.model';
import { BlogService } from '../../blog.service';
import { Author } from '../../author.model';
import { GlobalService } from 'src/app/shared/global.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  //Global variables
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;

  //Post variables
  post: Post;
  author: Author;
  postFormattedDate: string;
  @ViewChild('contentContainer', { static: false, read: ViewContainerRef }) contentContainer: ViewContainerRef;
  postImageSize: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute, private blogService: BlogService,
    private router: Router, private location: Location, public breakpointObserver: BreakpointObserver ) { }

  ngOnInit() {
    //Global variables initialization
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['post'];

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        //Update language and translation words
        this.language = params.language;
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['post'];

        //Update post information
        const postParam = params.postUrl;
        if (!isNaN(postParam)) {
          this.post = this.blogService.getPostById(postParam);
          this.router.navigateByUrl(this.language + '/blog/' + this.post.url)
        }
        else {
          this.post = this.blogService.getPostByUrl(postParam);
        }
        this.author = this.blogService.getAuthorById(this.post.authorId);
        this.postFormattedDate = new Date(this.post.date * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      }
    );

    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  nextArticle() {
    let nextPost = this.blogService.getPostById(this.post.id + 1);
    if (!nextPost) {
      nextPost = this.blogService.getPostById(0);
    }
    this.router.navigate(['../', nextPost.url], { relativeTo: this.activatedRoute });
  }

  createBreakpointsSubscription() {
    // Set product image url and update the change
    return this.breakpointObserver
      .observe(['(max-width: 450px)', '(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 450px)']) {
          this.postImageSize = '-small';
        }
        else if (state.breakpoints['(max-width: 760px)']) {
          this.postImageSize = '-medium';
        }
        else {
          this.postImageSize = '-large';
        }
      });
  }

  ngOnDestroy() {
    if(this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}