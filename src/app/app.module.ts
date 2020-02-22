import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-router.module';

import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { SharedModule } from './shared/shared.module';

import { ProductDisplayComponent } from './products/product-display/product-display.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostComponent } from './blog/posts-list/post/post.component';
import { PostItemComponent } from './blog/posts-list/post-item/post-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { GlobalService } from './shared/global.service';
import { JwPaginationComponent } from './shared/jw-pagination/jw-pagination.component';

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
    JwPaginationComponent
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
  entryComponents: [ProductItemComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (globalService: GlobalService) =>
        () => globalService.fetchTranslations(),
      deps: [GlobalService],
      multi: true
    },
    //LoggingService
  ]
})
export class AppModule { }
