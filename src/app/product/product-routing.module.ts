import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolverService } from '../main/products/products-resolver.service';
import { ProductComponent } from './product.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { 
              path: ':productCountry/:productId',
              component: ProductComponent,
              resolve: [ProductsResolverService]
            }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }