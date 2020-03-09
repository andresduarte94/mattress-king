import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-router.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductDisplayComponent } from './products/product-display/product-display.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostComponent } from './blog/posts-list/post/post.component';
import { PostItemComponent } from './blog/posts-list/post-item/post-item.component';
import { JwPaginationComponent } from './shared/jw-pagination/jw-pagination.component';
import { GlobalService } from './shared/global.service';

import { NouisliderModule } from 'ng2-nouislider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { PostContentComponent } from './blog/posts-list/post/post-content/post-content.component';
import { SEOService } from './shared/seo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ProductsComponent,
    FooterComponent,
    BlogComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDisplayComponent,
    PostsListComponent,
    PostComponent,
    PostItemComponent,
    JwPaginationComponent,
    PostContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NouisliderModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  exports: [ProductItemComponent],
  //entryComponents: [ProductItemComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (globalService: GlobalService) =>
        () => globalService.fetchTranslations(),
      deps: [GlobalService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (seoService: SEOService) =>
        () => seoService.fetchSEO(),
      deps: [SEOService],
      multi: true
    }
  ]
})
export class AppModule { }
