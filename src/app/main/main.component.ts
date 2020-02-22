import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products/products.service';
import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  //language: string;
  hideBanner: boolean = false;
  carousel: any;
  coverProducts: Product[] = [];

  constructor(private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    this.coverProducts.push(...[this.productsService.getProductById(19), this.productsService.getProductById(14)]);

    this.activatedRoute.params.subscribe( 
      (params: Params)=> {
        //this.language = params.language;
        this.hideBanner = false;
    })

    this.productsService.hideBannerEvent.subscribe((hide: boolean) => {
      this.hideBanner = hide;
    })
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
