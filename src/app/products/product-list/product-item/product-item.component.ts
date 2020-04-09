import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Product } from '../../product.model';
import { GlobalService } from 'src/app/shared/global.service';
import { Subscription } from 'rxjs';

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
  @Input() product: Product;
  productImage: string;
  discountPrice: number;
  discountDisplay: string;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.translationWords = this.globalService.getTranslationLanguage();

    // Calculate discount price
    this.discountPrice = Math.round((this.product.price*(1-this.product.discount/100) + Number.EPSILON) * 100)/100;
    // Set display discount string, empty for 0 discount
    if(this.product.discount === 0) {
      this.discountDisplay = '';
    }
    else {
      this.discountDisplay = this.product.discount + ' ' + this.translationWords['product-display'].off; 
    }



    this.productImage = 'assets/products/' + this.product.country  + '/product-' + this.product.country + '-' + this.product.id + '-large.jpg';

  }

  ngAfterViewInit() {
  }

}
