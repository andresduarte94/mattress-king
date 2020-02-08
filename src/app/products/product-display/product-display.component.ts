import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Filter } from './filter.model';
import { Product } from '../product.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { NouisliderComponent } from '../../../../node_modules/ng2-nouislider/ng2-nouislider.component';

declare var componentHandler: any;

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDisplayComponent implements OnInit {

  productTypes: string[];
  filter: Filter;
  products: Product[] = [];
  sizes: string[] = [];
  defaultType: number = 0;
  filterForm: FormGroup;
  checkedRadioPayment: number = null;
  public priceSliderValue: number[] = [0, 800];
  @ViewChild('priceSlider', { static: false }) priceSlider: NouisliderComponent;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
    this.sizes = this.productsService.getSizes(1);

    //Params subscription for manual URL and header bar links
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!params.hasOwnProperty('filter') || params.filter == 'all') {
          this.filter = {};
        }
        else if (params.filter == 'filter') {
          return;
        }
        else {
          this.filter = { type: this.productsService.getProductTypeId(params.filter) };
        }
        this.updateProducts(this.filter);
      }
    );

    //QueryParams subscription for search bar filter
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        if (queryParams.filterId) {
          this.filter = JSON.parse(sessionStorage.getItem('filter'));
          this.updateProducts(this.filter);
        }
      }
    );

    this.createReactiveForm();
  }

  createReactiveForm() {
    this.filterForm = new FormGroup({
      'productType': new FormControl(0),
      'priceSlider': new FormControl(null),
      'sizes': new FormGroup(this.sizes.reduce((sizesArray, size) => {
        sizesArray[size] = new FormControl(null);
        return sizesArray;
      }, {})),
      'mindiscount': new FormControl(0),
      'payments': new FormControl(null)
    });

    //Reactive form changes subscriptions
    this.filterForm.controls['productType'].valueChanges.subscribe(
      (productType) => {
        this.filter.type = productType;
        this.updateProducts(this.filter);
      }
    );
    this.filterForm.controls['priceSlider'].valueChanges.subscribe(
      (values) => {
        console.log(values);
      }
    );

    this.filterForm.controls['sizes'].valueChanges.subscribe(
      (values) => {
        console.log(values);
        let sizesArray = [];
        for (var size in values) {
          if (values[size]) {
            sizesArray.push(size);
          }
        }

        if(sizesArray.length == 0) {
          delete this.filter.sizes;
          this.updateProducts(this.filter);
        }
        else {
        this.filter.sizes = sizesArray;
        this.updateProducts(this.filter);
        }
      }
    );
    this.filterForm.controls['mindiscount'].valueChanges.subscribe(
      (mindiscount) => {
        this.filter.mindiscount = mindiscount;
        this.updateProducts(this.filter);
      }
    );
    this.filterForm.controls['payments'].valueChanges.subscribe(
      (payments) => {
        this.checkedRadioPayment = payments;
        this.filter.payments = payments;
        this.updateProducts(this.filter);
      }
    );

  }

  checkSize() {
    //this.filterForm.controls['sizes'];
  }

  updateScoreFilter(score: number) {
    this.filter.minscore = score;
    this.updateProducts(this.filter);
  }

  ngOnViewInit() {

  }

  ngAfterContentChecked() {
    componentHandler.upgradeAllRegistered();
  }

  createSizesControl() {
    let sizesArray = this.sizes.reduce((sizesArray, size) => {
      sizesArray.push(new FormControl(size));
      return sizesArray;
    }, []);
    console.log(sizesArray);
    return sizesArray;
  }

  uncheckRadio(event, radio: number) {
    if (this.checkedRadioPayment == radio) {
      event.preventDefault()
      this.checkedRadioPayment = null;
      this.filterForm.controls['payments'].reset();
    }
  }

  //Price slider configuration
  private priceSliderEventHandler = (e: KeyboardEvent) => {
    console.log("overridden keyboard handler");
    // determine which handle triggered the event
    let index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'));
    let multiplier: number = 0;
    let stepSize = 0.1;
    switch (e.which) {
      case 40:  // ArrowDown
      case 37:  // ArrowLeft
        multiplier = -2;
        e.preventDefault();
        break;
      case 38:  // ArrowUp
      case 39:  // ArrowRight
        multiplier = 3;
        e.preventDefault();
        break;
      default:
        break;
    }
    let delta = multiplier * stepSize;
    let newValue = [].concat(this.priceSliderValue);
    newValue[index] += delta;
    this.priceSliderValue = newValue;
  }

  public priceSliderConfig: any = {
    start: this.priceSliderValue,
    keyboard: true,
    connect: [false, true, false],
    onKeydown: this.priceSliderEventHandler,
    range: {
      min: 0,
      '35%': 200,
      max: 800
    },
    step: 10,
    format: {
      from: Number,
      to: (value) => {
        return Math.ceil(value) + " €";
      }
    }
  }

  formatLabel(value: number) {
    return value + '%';
  }

  //Update products based on new filter
  updateProducts(filter: Filter) {
    let products = this.productsService.getProducts(filter);
    this.products = products;
  }
}
