import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  language: string;
  hideBanner: boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( 
      (params: Params)=> {
        this.language = params.language;
        this.hideBanner = false;
    })

    this.productsService.hideBannerEvent.subscribe((hide: boolean) => {
      this.hideBanner = hide;
    })




  }

}
