import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { GlobalService } from 'src/app/shared/global.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  //Product variables
  @Input() products: Product[];
  //Pagination variables
  pageSize = 24;
  maxPages = 5;
  pageOfProducts: Array<any>;
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {}

  // update current pagination page of items
  onChangePage(pageOfProducts: Array<any>) {
    this.pageOfProducts = pageOfProducts;
    this.virtualScroll.scrollToIndex(0);
  }
}