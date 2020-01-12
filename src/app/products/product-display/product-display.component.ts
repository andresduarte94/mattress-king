import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  productTypes: string[];
  filter;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!params.hasOwnProperty('productType')) {
          this.filter = {};
        }
        else {
          this.filter = { type: this.productsService.getProductTypeId(params.productType) };
        }
        this.productsService.filterChanged.next(this.filter);
      }
    );
  }

}
