import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productTypes: string[];
  faShoppingCart = faShoppingCart;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
  }

}
