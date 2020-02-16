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
    { path: ':language/home', component: MainComponent, resolve: [ProductsResolverService]},
    { path: ':language/products', pathMatch: 'full', redirectTo: ':language/products/all'},
    { path: ':language/products/:productType', component: ProductsComponent, resolve: [ProductsResolverService]},
    { path: ':language/blog', component: BlogComponent, resolve: [PostsResolverService, AuthorsResolverService]},
    { path: ':language/blog/:postIndex', component: PostComponent, resolve: [PostsResolverService, AuthorsResolverService, ProductsResolverService]},
    { path: '**', redirectTo: 'en/home'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'top'}) //enableTracing: true
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
