import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';





const appRoutes: Routes = [
    {path:'home', component:, redirectTo: '/home', pathMatch:'full'},
    // {path: 'recipes', component: RecipesComponent, children: [
    //     {path: '', component: RecipesStartComponent, pathMatch:'full'}, 
    //     {path: ':id', component: RecipeDetailComponent, pathMatch:'full'},
    //     {path: ':id/edit', component: RecipeEditComponent}        
    // ]},
    // //{path: 'recipes/:id/edit', component: RecipeEditComponent},
    // {path: 'shoppingList', component: ShoppingListComponent, children: [{path: 'edit', component: ShoppingEditComponent}]}
    // //{path: '', component: }
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouter {

}