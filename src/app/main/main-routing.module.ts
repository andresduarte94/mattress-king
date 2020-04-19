import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsResolverService } from './products/products-resolver.service';
import { PostsResolverService } from '../blog/posts-resolver.service';
import { MainComponent } from './main.component';

const routes: Routes = [
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }