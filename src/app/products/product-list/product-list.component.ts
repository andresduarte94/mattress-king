import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];

  //Pagination variables
  pageSize = 8;
  maxPages = 5;
  pageOfProducts: Array<any>;

  constructor() { }

  ngOnInit() {}

  // update current pagination page of items
  onChangePage(pageOfProducts: Array<any>) {
    this.pageOfProducts = pageOfProducts;
  }

}
