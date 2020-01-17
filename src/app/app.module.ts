import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-router.module';

import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { SharedModule } from './shared/shared.module';

import { JwPaginationComponent } from 'jw-angular-pagination';
import { ProductDisplayComponent } from './products/product-display/product-display.component';
import { PostItemComponent } from './blog/post-item/post-item.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostComponent } from './blog/posts-list/post/post.component';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    MainComponent, 
    ProductsComponent, 
    FooterComponent, 
    BlogComponent, 
    ProductListComponent, 
    ProductDetailComponent, 
    ProductItemComponent,
    JwPaginationComponent,
    ProductDisplayComponent,
    PostItemComponent,
    PostsListComponent,
    PostComponent
  ], 
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
    ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
