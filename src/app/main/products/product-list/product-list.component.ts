import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product.model';
import { GlobalService } from 'src/app/shared/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  // Global variables
  translationWords: any;
  updateLanguageSub: Subscription;

  //Product variables
  @Input() products: Product[] = [];

  //Pagination variables
  pageSize = 8;
  maxPages = 5;
  pageOfProducts: Array<any>;
  previousLabel;
  nextLabel;
  firstLabel;
  lastLabel;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.translationWords = this.globalService.getTranslationLanguage();
    this.previousLabel = this.translationWords.blog.previousLabel;
    this.nextLabel = this.translationWords.blog.nextLabel;
    this.firstLabel = this.translationWords.blog.firstLabel;
    this.lastLabel = this.translationWords.blog.lastLabel;

    this.updateLanguageSub = this.globalService.updateSubComponentLanguage.subscribe((translationWords) => {
      // Set pagination labels
      this.translationWords = translationWords;
      this.previousLabel = translationWords.blog.previousLabel;
      this.nextLabel = translationWords.blog.nextLabel;
      this.firstLabel = translationWords.blog.firstLabel;
      this.lastLabel = translationWords.blog.lastLabel;
    })
  }

  // update current pagination page of items
  onChangePage(pageOfProducts: Array<any>) {
    this.pageOfProducts = pageOfProducts;
  }

  ngOnDestroy() {
    if (this.updateLanguageSub) {
      this.updateLanguageSub.unsubscribe();
    }
  }
}
