import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../product.model';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ProductsService } from '../../products.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  // Global variables
  @Input() translationWords: any;
  updateLanguageSub: Subscription;

  //Product variables
  @Input() productId: number;
  @Input() productCountry: string;
  product: Product;
  productImage: string;
  discountPrice: number;
  discountDisplay: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(private productsService: ProductsService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.product = this.productsService.getProductById(this.productId, this.productCountry);

    // Calculate discount price
    this.discountPrice = Math.round((this.product.price*(1-this.product.discount/100) + Number.EPSILON) * 100)/100;
    // Set display discount string, empty for 0 discount
    if(this.product.discount === 0) {
      this.discountDisplay = '';
    }
    else {
      const off = '% ' + (this.productCountry == 'us'? 'off':'dto.');
      this.discountDisplay = this.product.discount + ' ' + off; 
    }

    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  ngAfterViewInit() {
  }

  createBreakpointsSubscription() {
    let size: string;
    return this.breakpointObserver
    .observe(['(max-width: 330px)', '(max-width: 576px)', '(max-width: 640px)', '(max-width: 762px)',
    '(max-width: 1530px)', '(max-width: 1824px)'])
    .subscribe((state: BreakpointState) => {

      if (state.breakpoints['(max-width: 330px)']) {
        size = 'small';
      } 
      else if (state.breakpoints['(max-width: 576px)']) {
        size = 'medium';
      }
      else if (state.breakpoints['(max-width: 640px)']) {
        size = 'small';
      }
      else if (state.breakpoints['(max-width: 762px)']) {
        size = 'medium';
      }
      else if (state.breakpoints['(max-width: 1530px)']) {
        size = 'small';
      }
      else if (state.breakpoints['(max-width: 1824px)']) {
        size = 'medium';
      }
      else {
        size = 'large';
      }
      // Set product image url and update the change
      this.productImage = `https://assets.mattressfinder.shop/v2/assets/products/${this.product.country}/product-${this.product.country}-${this.product.id}-${size}`;
    });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }

}
