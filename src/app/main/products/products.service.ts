import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from './product.model';
import { Filter } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  filterUpdateEvent = new BehaviorSubject<Filter>({});
  productsUpdateEvent = new Subject<Product[]>();
  private products: Product[] = [];
  readonly productTypes: string[] = ['all', 'mattresses', 'beds', 'sheets', 'pillows', 'accessories'];

  constructor() {}

  getProducts(filter?: Filter) {
    let products = this.products.slice();
    if (!filter) {
      return products;
    }

    products = products.filter((product) => {
      return (filter.hasOwnProperty('type') ? (product.type == filter.type || filter.type == 0) : true) &&
        (filter.hasOwnProperty('search') ? this.filterSearch(product, filter) : true) &&
        (filter.hasOwnProperty('minprice') && filter.hasOwnProperty('maxprice') ? (filter.minprice <= product.price && product.price <= filter.maxprice) : true) &&
        (filter.hasOwnProperty('sizes') ? this.checkSizesFilter(filter, product) : true) &&
        (filter.hasOwnProperty('minscore') ? (product.score >= filter.minscore) : true) &&
        (filter.hasOwnProperty('mindiscount') ? (product.discount >= filter.mindiscount) : true) &&
        (filter.hasOwnProperty('payments') ? (product.payments >= filter.payments) : true) &&
        (filter.hasOwnProperty('country') ? (product.country == filter.country || filter.country == 'all') : true);
    });

    return products;
  }

  filterSearch(product: Product, filter: Filter) {
    const normalizeSearchArray = filter.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
    const normalizeName = product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizeDesc = product.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const condition = normalizeSearchArray.every((searchWord) => {
      const wordRegex = RegExp(searchWord, 'i');
      return (wordRegex.test(normalizeName) ||
        wordRegex.test(normalizeDesc))
    });
    return condition;
  }

  getProductById(id: number, country: string) {
    return this.products.slice().find((product: Product) => {
      return product.id === id && product.country === country;
    })
  }

  setProducts(products: Product[]) {
    this.products = this.shuffle(products);
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
      return count[size] > 7 && size != '';
    });
    return sizes;
  }

  checkSizesFilter(filter: Filter, product: Product) {
    let checkCondition = false;
    for (var i = 0; i < filter.sizes.length; i++) {
      if (product.sizes.includes(filter.sizes[i])) {
        checkCondition = true;
        break;
      }
    }
    return checkCondition;
  }

  shuffle(array: Product[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}