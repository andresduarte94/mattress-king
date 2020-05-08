import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ProductsService } from '../../products.service';
import { GlobalService } from 'src/app/shared/global.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  // Global variables
  translationWords: any;
  updateLanguageSub: Subscription;

  //Product variables
  @Input('id') productId: number;
  @Input('country') productCountry: string;
  product: Product;
  productImage: string;
  discountPrice: number;
  discountDisplay: string;
  currency: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(private productsService: ProductsService, public breakpointObserver: BreakpointObserver, private globalService: GlobalService) { }

  ngOnInit() {
    // Get product based on ProductId and Product country
    this.product = this.productsService.getProductById(this.productId, this.productCountry);
    this.currency = this.productCountry == 'us'? '$':'€';

    // Get translations for 'off' string
    this.translationWords = this.globalService.getTranslationLanguage();

    // Calculate discount price
    this.discountPrice = Math.round((this.product.price*(1-this.product.discount/100) + Number.EPSILON) * 100)/100;
    // Set display discount string, empty for 0 discount
    if(this.product.discount === 0) {
      this.discountDisplay = '';
    }
    else {
      this.discountDisplay = this.product.discount + this.translationWords['product-display'].off; 
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