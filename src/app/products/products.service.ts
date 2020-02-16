import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';
import { Filter } from './product-display/filter.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  filterUpdateEvent = new Subject<any>();
  hideBannerEvent = new Subject<Boolean>();
  clearFilterEvent = new Subject<Filter>();
  private products: Product[] = [];
  readonly productTypes: string[] = ['All', 'Mattresses', 'Beds', 'Sheets', 'Pillows', 'Accessories'];

  getProducts(filter?: Filter) {
    let products = this.products.slice();
    if (!filter) {
      return products;
    }

    products = products.filter(function (product) {
      return (filter.hasOwnProperty('type') ? (product.type == filter.type || filter.type == 0) : (true)) &&
        ((filter.hasOwnProperty('name') ? (RegExp(filter.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i')
          .test(product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true)) ||
          (filter.hasOwnProperty('description') ? (RegExp(filter.description, 'i').test(product.description.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true))) &&
          (filter.hasOwnProperty('minprice') && filter.hasOwnProperty('maxprice') ? ((filter.minprice <= product.price) && (product.price <= filter.maxprice)) : (true)) &&
        (filter.hasOwnProperty('sizes') ? (filter.sizes.includes(product.size)) : (true)) &&
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
    productType = productType.charAt(0).toUpperCase() + productType.slice(1);
    return this.productTypes.indexOf(productType);
  }


  onFilterChange(filter: Filter) {

  }

  getSizes(type: number) {
    let filteredProducts: Product[] = this.products.filter((product) => {
      return (product.type == type);
    });

    let sizes = filteredProducts.reduce((sizes, product) => {
      sizes.push(product.size);
      return sizes;
    }, []);

    var seen = {};
    return sizes.filter(function (size) {
      return seen.hasOwnProperty(size) ? false : (seen[size] = true);
    });
  }
}