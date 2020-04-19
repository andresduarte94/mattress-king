import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostItemComponent } from './posts-list/post-item/post-item.component';
import { PostComponent } from './posts-list/post/post.component';
import { PostContentComponent } from './posts-list/post/post-content/post-content.component';

@NgModule({
  declarations: [
    BlogComponent,
    PostsListComponent,
    PostItemComponent,
    PostComponent,
    PostContentComponent
  ],
  imports: [
    RouterModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule {}