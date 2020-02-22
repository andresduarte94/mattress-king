import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products/products.service';
import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  //language: string;
  hideBanner: boolean = false;
  carousel: any;

  constructor(private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
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
