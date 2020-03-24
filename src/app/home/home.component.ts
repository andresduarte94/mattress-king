import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.model';

import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carousel: any;
  coverProducts: Product[] = [];

  constructor(private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    this.coverProducts.push(...[this.productsService.getProductById(19), this.productsService.getProductById(14)]);

    this.activatedRoute.params.subscribe( 
      (params: Params)=> {
    });
  }

  ngAfterViewInit() {
    //Initialize carousel
    this.carousel = (<any>$('.carousel')).carousel({
      interval: 4000,
      pause: "hover",
      touch: true
    }).carousel('cycle');
  }

  
  next() {
    this.carousel.carousel('next');
  }

  prev() {
    this.carousel.carousel('prev');
  }

  selectPost(index: number) {
    this.carousel.carousel(index);
  }

}
