import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductsResolverService } from './products/products-resolver.service';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: MainComponent, resolve: [ProductsResolverService]},
    { path: 'products', component: ProductsComponent, pathMatch: 'full', resolve: [ProductsResolverService]},
    { path: 'products/:productType', component: ProductsComponent, resolve: [ProductsResolverService]}
    
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
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
