import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../shared/global.service';
import { Product } from '../main/products/product.model';
import { ProductsService } from '../main/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // Global variables
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;
  // Product variables
  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private globalService: GlobalService, private productsService: ProductsService) { }

  ngOnInit() {
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['product'];

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.country = params.country;
        this.product = this.productsService.getProductById(params.id, this.country);
      })
  }
}