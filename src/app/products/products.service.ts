import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';
import { Filter } from './product-display/filter.model';
import { GlobalService } from '../shared/global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  filterUpdateEvent = new Subject<any>();
  hideBannerEvent = new Subject<Boolean>();
  clearFilterEvent = new Subject<Filter>();
  private products: Product[] = [];
  readonly productTypes: string[] = ['all', 'mattresses', 'beds', 'sheets', 'pillows', 'accessories'];

  constructor(private globalService: GlobalService) { }

  getProducts(filter?: Filter) {
    let products = this.products.slice();
    if (!filter) {
      return products;
    }

    products = products.filter((product) => {
      return (filter.hasOwnProperty('type') ? (product.type == filter.type || filter.type == 0) : (true)) &&
        ((filter.hasOwnProperty('name') ? (RegExp(filter.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i')
          .test(product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true)) ||
          (filter.hasOwnProperty('description') ? (RegExp(filter.description, 'i').test(product.description.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true))) &&
        (filter.hasOwnProperty('minprice') && filter.hasOwnProperty('maxprice') ? ((filter.minprice <= product.price) && (product.price <= filter.maxprice)) : (true)) &&
        (filter.hasOwnProperty('sizes') ? this.checkSizesFilter(filter, product) : (true)) &&
        (filter.hasOwnProperty('minscore') ? (product.score >= filter.minscore) : (true)) &&
        (filter.hasOwnProperty('mindiscount') ? (product.discount >= filter.mindiscount) : (true)) &&
        (filter.hasOwnProperty('payments') ? (product.payments >= filter.payments) : (true)) &&
        (filter.hasOwnProperty('country') ? (product.country == filter.country || filter.country == 'all') : (true));
    });

    return products;
  }

  getProductById(index: number) {
    return this.products.slice()[index];
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  getProductTypeId(productType: string) {
    return this.productTypes.indexOf(productType);
  }

  getSizes(type: number) {
    // Filter products by given size
    let filteredProducts: Product[] = this.products.filter((product) => {
      return (product.type == type);
    });

    // Push each product sizes to all sizes array
    let sizes = [];
    filteredProducts.reduce((sizes, product) => {
      sizes.push(...product.sizes);
      return sizes;
    }, sizes);

    // Remove duplicate sizes and fill count obj
    var count = {};
    sizes = sizes.filter((size) => {
      let existCond = count.hasOwnProperty(size);
      count[size] = existCond ? ++count[size] : 0;
      return !existCond;
    })

    // Filter by most repeated using count obj
    sizes = sizes.filter(function (size) {
      return count[size] > 7;
    });
    return sizes;
  }

  checkSizesFilter(filter: Filter, product: Product) {
    let checkCondition = false;
    for(var i=0; i < filter.sizes.length; i++) {
      if(product.sizes.includes(filter.sizes[i])) {
        checkCondition = true;
        break;
      }
    }
    return checkCondition;
  }
}