import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  discountPrice: number;

  constructor() { }

  ngOnInit() {
    // Calculate discount price
    this.discountPrice = Math.round((this.product.price*(1-this.product.discount/100) + Number.EPSILON) * 100)/100;
  }

}
