import { Component, OnInit, HostListener, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/shared/global.service';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { Subscription } from 'rxjs';
import { Filter } from './filter.model';

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
  filter: Filter = {};
  hideFilter: boolean;
  public innerWidth: any;
  @ViewChild('productFilterElement', { read: ViewContainerRef }) productFilterElement: ViewContainerRef;
  productFilterRef: ComponentRef<ProductFilterComponent>;
  filterUpdateSub: Subscription;

  constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute,
    private productsService: ProductsService, private resolver: ComponentFactoryResolver) { }

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
          const poductTypeId = this.productsService.getProductTypeId(params.productType);
          this.filter.type = poductTypeId;
        }
        else {
          this.filter.type = 0;
        }
        this.updateProducts();
        this.productsService.productFilterUpdateEvent.next(this.filter);
      }
    );
    //QueryParams subscription for change country filter
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.filter.country = queryParams.gl ? queryParams.gl : 'all';
      this.updateProducts();
      this.productsService.productFilterUpdateEvent.next(this.filter);
    });

    //Update filters from search bar
    this.filterUpdateSub = this.productsService.filterUpdateEvent.subscribe((filter: Filter) => {
      if (Object.keys(filter).length === 0) return;
      Object.keys(filter).forEach((key) => {
        this.filter[key] = filter[key];
      });
      this.updateProducts();
    });
    this.createFilterComponent();
  }

  updateProducts() {
    this.products = this.productsService.getProducts(this.filter);
  }

  toggleNavbar() {
    this.hideFilter = !this.hideFilter;
  }

  createFilterComponent() {
    if (!this.productFilterRef) {
      import(`src/app/main/products/product-filter/product-filter.component`).then(({ ProductFilterComponent }) => {
        const factory = this.resolver.resolveComponentFactory(ProductFilterComponent);
        this.productFilterRef = this.productFilterElement.createComponent(factory);
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.innerWidth == window.innerWidth) {
      return;
    }
    this.innerWidth = window.innerWidth;
    this.hideFilter = this.innerWidth <= 762;
  }

  ngOnDestroy() {
    if (this.filterUpdateSub) this.filterUpdateSub.unsubscribe();
  }
}