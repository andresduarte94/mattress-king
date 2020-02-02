import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { Filter } from '../product-display/filter.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  products : Product[] = [];
  @Input() filter: Filter;
  productsChanged: Subscription;

  //Pagination variables
  pageSize = 12;
  maxPages = 5;
  pageOfProducts: Array<any>;

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    //Set product onInit and on filterChanged subject
    this.updateProducts(this.filter);
    this.productsChanged = this.productsService.filterChanged.subscribe(
      (filter: Filter) => {
        this.updateProducts(filter);
      }
    )
  }

  //Update products based on new filter
  updateProducts(filter: Filter) {
    let products = this.productsService.getProducts(filter);
    this.products = products;
  }

  // update current pagination page of items
  onChangePage(pageOfProducts: Array<any>) {
      this.pageOfProducts = pageOfProducts;
  }

  ngOnDestroy() {
    this.productsChanged.unsubscribe();
  }


}
