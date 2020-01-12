import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productTypes: string[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
  }

}
