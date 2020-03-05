import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductsResolverService } from './products/products-resolver.service';
import { ProductsComponent } from './products/products.component';
import { BlogComponent } from './blog/blog.component';
import { PostsResolverService } from './blog/posts-resolver.service';
import { PostComponent } from './blog/posts-list/post/post.component';
import { AuthorsResolverService } from './blog/authors-resolver.service';

const appRoutes: Routes = [
  {
    path: ':language',
    children: [
      {
        path: 'home', component: MainComponent, data: {
          title: 'Home',
          description: 'Description Meta Tag Content',
        }, resolve: [ProductsResolverService]
      },
      { path: 'products', pathMatch: 'full', redirectTo: 'products/all' },
      { path: 'products/:productType', component: ProductsComponent, data: {
        title: 'Products',
        description: 'Description Meta Tag Content',
      }, resolve: [ProductsResolverService] },
      { path: 'blog', component: BlogComponent, data: {
        title: 'Blog',
        description: 'Description Meta Tag Content',
      }, resolve: [PostsResolverService, AuthorsResolverService] },
      {
        path: 'blog/:postIndex', component: PostComponent, data: {
          title: '',
          description: 'Description Meta Tag Content',
        }, resolve: [
          PostsResolverService, AuthorsResolverService, ProductsResolverService]
      },
      { path: '**', redirectTo: 'home' }
    ],
  },
  { path: '**', redirectTo: 'es/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'top'}) //, enableTracing: true, 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
