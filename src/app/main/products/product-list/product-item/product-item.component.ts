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
  language: string;
  componentWords: any;
  updateLanguageSub: Subscription;
  // Product variables
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
    this.language = this.globalService.getLanguage();
    this.componentWords = this.globalService.getTranslationLanguage()['product-display'];
    // Get product based on ProductId and Product country
    this.product = this.productsService.getProductById(this.productId, this.productCountry);
    // Get translations for 'off' string
    this.updateLanguageSub = this.globalService.updateLanguage.subscribe((translationWords: any) => {
      this.componentWords = translationWords['product-display'];
      this.language = this.globalService.getLanguage();
    });
    // Set display discount string, empty for 0 discount
    if (this.product.discount === 0) {
      this.discountDisplay = '';
    }
    else {
      this.discountDisplay = this.product.discount + this.componentWords.off;
    }
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  createBreakpointsSubscription() {
    let size: string;
    return this.breakpointObserver
      .observe(['(max-width: 330px)', '(max-width: 762px)', '(max-width: 1530px)', '(max-width: 1824px)'])
      .subscribe((state: BreakpointState) => {
        const booleans = state.breakpoints;
        if (booleans['(max-width: 330px)']) {
          size = 'small';
        }
        else if (booleans['(max-width: 762px)']) {
          size = 'medium';
        }
        else if (booleans['(max-width: 1530px)']) {
          size = 'small';
        }
        else if (booleans['(max-width: 1824px)']) {
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
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
    if (this.updateLanguageSub) {
      this.updateLanguageSub.unsubscribe();
    }
  }
}