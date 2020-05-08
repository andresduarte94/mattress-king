import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products/products.service';
import { Product } from './products/product.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  coverProducts: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.coverProducts.push(...[this.productsService.getProductById(19, 'es'), this.productsService.getProductById(14, 'es')]);
  }
}