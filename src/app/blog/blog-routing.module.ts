import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsResolverService } from './posts-resolver.service';
import { AuthorsResolverService } from './authors-resolver.service';
import { ProductsResolverService } from '../main/products/products-resolver.service';

import { BlogComponent } from './blog.component';
import { PostComponent } from './posts-list/post/post.component';

const routes: Routes = [
    {
        path: '',
        resolve: [PostsResolverService, AuthorsResolverService],
        children: [
            {
                path: '', component: BlogComponent
            },
            {
                path: ':postUrl', component: PostComponent, resolve: [ProductsResolverService]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }