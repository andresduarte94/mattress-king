import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  language: string;
  translationWords: any;
  componentWords: any;
  products: Product[] = [];
  hideFilter: boolean;
  public innerWidth: any;

  constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    //Global variables initialization
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['product-display'];
    //Ui variables
    this.innerWidth = window.innerWidth;
    this.hideFilter = this.innerWidth <= 762;

    //Params subscription for setting language and productType filter
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Update language and translation words
        if (params.hasOwnProperty('language') && this.language !== params.language) {
          this.language = params.language;
          this.translationWords = this.globalService.getTranslationLanguage();
          this.componentWords = this.translationWords['product-display'];
          this.globalService.updateSubComponentLanguage.next(this.translationWords);
        }

        //Update products based on new productType from URL
        if (params.hasOwnProperty('productType')) {
          console.log('type')

          const poductTypeId = this.productsService.getProductTypeId(params.productType);
          let filter = {};
          filter['type'] = poductTypeId;
          //this.productsService.filterUpdateEvent.next(filter);
        }
      }
    );

    //QueryParams subscription for change country filter
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
        console.log('query')
        let filter = {};
        filter['country'] = queryParams.gl ? queryParams.gl : 'all';;
        this.productsService.filterUpdateEvent.next(filter);
    });

    this.productsService.productsUpdateEvent.subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  toggleNavbar() {
    this.hideFilter = !this.hideFilter;
  }

  ngAfterViewChecked(){
  
  }

  @HostListener('window:resize')
  onResize() {
    if (this.innerWidth == window.innerWidth) {
      return;
    }
    this.innerWidth = window.innerWidth;
    this.hideFilter = this.innerWidth <= 762;
  }
}