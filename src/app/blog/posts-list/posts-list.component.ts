import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  // Global variables
  componentWords: any;
  updateLanguageSub: Subscription;

  // Posts variables
  posts: Post[] = [];
  filter = null;

  //Pagination variables
  pageSize = 6;
  maxPages = 5;
  pageOfPosts: Array<any>;
  previousLabel: string;
  nextLabel: string;
  firstLabel: string;
  lastLabel: string;
  updateLanguageSubscription: Subscription;

  constructor(private globalService: GlobalService, private blogService: BlogService) { }

  ngOnInit() {
    //Set posts
    this.posts = this.blogService.getPosts();

    // Initialize translation words and pagination labels
    this.componentWords = this.globalService.getTranslationLanguage().blog;
    this.previousLabel = this.componentWords.previousLabel;
    this.nextLabel = this.componentWords.nextLabel;
    this.firstLabel = this.componentWords.firstLabel;
    this.lastLabel = this.componentWords.lastLabel;

    this.updateLanguageSub = this.globalService.updateSubComponentLanguage.subscribe((componentWords) => {
      // Update component words and pagination labels
      this.componentWords = componentWords;
      this.previousLabel = componentWords.previousLabel;
      this.nextLabel = componentWords.nextLabel;
      this.firstLabel = componentWords.firstLabel;
      this.lastLabel = componentWords.lastLabel;
    });
  }

  // Update current pagination page of items
  onChangePage(pageOfPosts: Array<any>) {
    this.pageOfPosts = pageOfPosts;
  }

  ngOnDestroy() {
    if (this.updateLanguageSub) {
      this.updateLanguageSub.unsubscribe();
    }
  }
}
