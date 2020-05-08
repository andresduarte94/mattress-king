import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductsResolverService } from './main/products/products-resolver.service';
import { PostsResolverService } from './blog/posts-resolver.service';
import { ProductsComponent } from './main/products/products.component';

const appRoutes: Routes = [
  {
    path: ':language',
    children: [
      {
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule'
      },
      {
        path: '',
        resolve: [ProductsResolverService],
        children: [
          {
            path: 'home', component: MainComponent, resolve: [PostsResolverService]
          },
          {
            path: 'products',
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'all' },
              { path: ':productType', component: ProductsComponent }
            ]
          },
          { path: '**', redirectTo: 'home' }
        ]
      }
    ],
  },
  { path: '', component: MainComponent, resolve: [ProductsResolverService, PostsResolverService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'top' }) //,, enableTracing: true   ,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }