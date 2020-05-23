import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../shared/global.service';
import { Product } from '../main/products/product.model';
import { ProductsService } from '../main/products/products.service';
import { Subscription } from 'rxjs';
import { SEOService } from '../shared/seo.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // Global variables
  productCountry: string;
  componentWords: any;
  updateLanguageSub: Subscription;
  // Product variables
  product: Product;
  productImage: string;
  breakpointSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private globalService: GlobalService, public breakpointObserver: BreakpointObserver,
    private productsService: ProductsService, private seoService: SEOService) { }

  ngOnInit() {
    this.componentWords = this.globalService.getTranslationLanguage()['product'];
    this.productCountry = this.activatedRoute.snapshot.params.productCountry;
    this.product = this.productsService.getProductById(+this.activatedRoute.snapshot.params.productId, this.productCountry);
    this.seoService.updateTitle(this.product.name);
    this.seoService.updateDescription(this.product.description);
    this.productImage = `https://assets.mattressfinder.shop/v2/assets/products/${this.productCountry}/product-${this.productCountry}-${this.product.id}-large`;

    this.updateLanguageSub = this.globalService.updateLanguage.subscribe((translationWords: any) => {
      this.componentWords = translationWords['product'];
    });
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  createBreakpointsSubscription() {
    let size: string;
    return this.breakpointObserver
      .observe(['(max-width: 410px)', '(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        const booleans = state.breakpoints;
        if (booleans['(max-width: 410px)']) {
          size = 'small';
        }
        else if (booleans['(max-width: 1200px)']) {
          size = 'medium';
        }
        else {
          size = 'large';
        }
        // Set product image url and update the change
        this.productImage = `https://assets.mattressfinder.shop/v2/assets/product/${this.product.country}/product-${this.product.country}-${this.product.id}-${size}`;
      });
  }

  ngOnDestroy() {
    if (this.updateLanguageSub) {
      this.updateLanguageSub.unsubscribe();
    }
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}