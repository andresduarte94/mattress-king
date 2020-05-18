import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductsService } from '../products.service';
import { GlobalService } from 'src/app/shared/global.service';
import { Filter } from '../filter.model';
import { NouisliderComponent } from 'ng2-nouislider/ng2-nouislider.component';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  //Global variables
  country: string;
  translationWords: any;
  componentWords: any;
  //Product variables
  productTypes: string[];
  filter: Filter = {};
  // Filter menu variables
  sizes: string[] = [];
  filterForm: FormGroup;
  checkedRadioPayment: number = null;
  public priceSliderValue: number[] = [0, 2000];
  @ViewChild('priceSlider', { static: false }) priceSlider: NouisliderComponent;
  @ViewChild('sliderForm', { static: false }) sliderForm: NgForm;
  filterUpdateSub: Subscription;

  constructor(private productsService: ProductsService, private globalService: GlobalService) { }

  ngOnInit() {
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['product-display'];
    //Product variables initialization
    this.productTypes = this.productsService.productTypes;
    this.sizes = this.productsService.getSizes(1);
    //Create, initialize and set subscriptions for filter form
    this.createReactiveFilterForm();

    this.globalService.updateSubComponentLanguage.subscribe((translationWords) => {
      this.translationWords = translationWords;
      this.componentWords = translationWords['product-display'];
    });


  }

  ngAfterViewInit(){
    //Update filters from search bar
    this.filterUpdateSub = this.productsService.filterUpdateEvent.subscribe((filter: Filter) => {
      if(Object.keys(filter).length === 0) return;
      Object.keys(filter).forEach((key) => {
        this.filter[key] = filter[key];
      });
      this.updateProducts(this.filter);
      if(filter.hasOwnProperty('type')) {
        const poductTypeId = filter.type;
        this.filterForm.controls['productType'].setValue(this.productTypes[poductTypeId]);
      }
    } );
  }

  //Update products based on new filter
  updateProducts(filter: Filter) {
    const products = this.productsService.getProducts(filter);
    this.productsService.productsUpdateEvent.next(products);
  }

  // Create filters form with all inputs and value changes subscriptions
  createReactiveFilterForm() {
    //Create and initialize form
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

    //Product type filter
    this.filterForm.controls['productType'].valueChanges.subscribe(
      (productTypeId) => {
        this.filter.type = +productTypeId;
        this.updateProducts(this.filter);
      }
    );
    //Min price and Max Price slider filter
    this.filterForm.controls['priceSlider'].valueChanges.subscribe(
      (values) => {
        this.filter.minprice = this.priceSliderValue[0];
        this.filter.maxprice = this.priceSliderValue[1];
        this.updateProducts(this.filter);
      }
    );
    //Sizes filter
    this.filterForm.controls['sizes'].valueChanges.subscribe(
      (values) => {
        let sizeArrayValues = [];
        for (var size in values) {
          if (values[size]) {
            sizeArrayValues.push(size);
          }
        }

        if (sizeArrayValues.length == 0) {
          delete this.filter.sizes;
          this.updateProducts(this.filter);
        }
        else {
          this.filter.sizes = sizeArrayValues;
          this.updateProducts(this.filter);
        }
      }
    );
    //Minimum discount filter
    this.filterForm.controls['mindiscount'].valueChanges.subscribe(
      (mindiscount) => {
        this.filter.mindiscount = mindiscount;
        this.updateProducts(this.filter);
      }
    );
    //Payments filter
    this.filterForm.controls['payments'].valueChanges.subscribe(
      (payments) => {
        this.checkedRadioPayment = payments;
        this.filter.payments = payments;
        this.updateProducts(this.filter);
      }
    );
  }

  updateScoreFilter(score: number) {
    this.filter.minscore = score;
    this.updateProducts(this.filter);
  }

  //Price slider configuration
  private priceSliderEventHandler = (e: KeyboardEvent) => {
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
  public i = 0;
  public priceSliderConfig: any = {
    start: this.priceSliderValue,
    keyboard: true,
    connect: [false, true, false],
    onKeydown: this.priceSliderEventHandler,
    range: {
      min: 0,
      '60%': 200,
      '80%': 300,
      '95%': 1800,
      max: 2000
    },
    step: 10,
    format: {
      from: Number,
      to: (value) => {
        let val = Math.ceil(value);
        if (this.i == 0 || this.i % 2 == 0) {
          this.priceSliderValue[0] = val;
        }
        else {
          this.priceSliderValue[1] = val;
        }
        this.i++;
        const currency = this.country == 'es' ? '€' : '$';
        return val + " " + currency;
      }
    }
  }
  formatLabel(value: number) {
    return value + '%';
  }

  uncheckRadio(event, radio: number) {
    if (this.checkedRadioPayment == radio) {
      event.preventDefault()
      this.checkedRadioPayment = null;
      this.filterForm.controls['payments'].reset();
    }
  }

  ngOnDestroy() {
    if (this.filterUpdateSub) this.filterUpdateSub.unsubscribe();
  }
}