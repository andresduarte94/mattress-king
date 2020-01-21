import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductsResolverService } from './products/products-resolver.service';
import { ProductsComponent } from './products/products.component';
import { BlogComponent } from './blog/blog.component';
import { PostsResolverService } from './blog/posts-resolver.service';
import { PostComponent } from './blog/posts-list/post/post.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: MainComponent, resolve: [ProductsResolverService]},
    { path: 'products', pathMatch: 'full', redirectTo: '/products/all'}, //delete this and change links
    { path: 'products/:productType', component: ProductsComponent, resolve: [ProductsResolverService]},
    { path: 'blog', component: BlogComponent, resolve: [PostsResolverService]},
    { path: 'blog/:postId', component: PostComponent, resolve: [PostsResolverService]} 

    
  //{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
//   { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
//   {
//     path: 'shopping-list',
//     loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
//   },
//   {
//     path: 'auth',
//     loadChildren: './auth/auth.module#AuthModule'
//   
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
