import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

import { ProductsService } from '../products.service';
import { GlobalService } from 'src/app/shared/global.service';
import { Filter } from '../filter.model';
import { NouisliderComponent } from 'ng2-nouislider/ng2-nouislider.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NouisliderModule } from 'ng2-nouislider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  //Global variables
  country: string;
  //translationWords: any;
  componentWords: any;
  updateLanguageSub: Subscription;
  //Product variables
  productTypes: string[];
  filter: Filter = {};
  // Filter menu variables
  sizes: string[] = [];
  filterForm: FormGroup;
  checkedRadioPayment: number = null;
  public priceSliderValue: number[] = [0, 2200];
  @ViewChild('priceSlider') priceSlider: NouisliderComponent;
  @ViewChild('sliderForm') sliderForm: NgForm;
  productFilterUpdateSub: Subscription;

  constructor(private productsService: ProductsService, private globalService: GlobalService) { }

  ngOnInit() {
    this.componentWords = this.globalService.getTranslationLanguage()['product-display'];
    //Product variables initialization
    this.productTypes = this.productsService.productTypes;
    this.sizes = this.productsService.getSizes(1);
    //Create, initialize and set subscriptions for filter form
    this.createReactiveFilterForm();

    this.updateLanguageSub = this.globalService.updateLanguage.subscribe((translationWords: any) => {
      this.componentWords = translationWords['product-display'];
    });

    this.productFilterUpdateSub = this.productsService.productFilterUpdateEvent.subscribe((info: any) => {
      if (info.hasOwnProperty('type')) {
        this.filterForm.controls['productType'].setValue(info.type, { emitEvent: false });
      }
      if (info.hasOwnProperty('country')) {
        this.country = info.country;
        this.filterForm.controls['priceSlider'].setValue(null, { emitEvent: false });
      }
    })
  }

  //Update products based on new filter
  updateFilter(filter: Filter) {
    this.productsService.filterUpdateEvent.next(filter);
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
        this.updateFilter(this.filter);
      }
    );
    //Min price and Max Price slider filter
    this.filterForm.controls['priceSlider'].valueChanges.subscribe(
      (values) => {
        this.filter.minprice = this.priceSliderValue[0];
        this.filter.maxprice = this.priceSliderValue[1];
        this.updateFilter(this.filter);
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
          this.updateFilter(this.filter);
        }
        else {
          this.filter.sizes = sizeArrayValues;
          this.updateFilter(this.filter);
        }
      }
    );
    //Minimum discount filter
    this.filterForm.controls['mindiscount'].valueChanges.subscribe(
      (mindiscount) => {
        this.filter.mindiscount = mindiscount;
        this.updateFilter(this.filter);
      }
    );
    //Payments filter
    this.filterForm.controls['payments'].valueChanges.subscribe(
      (payments) => {
        this.checkedRadioPayment = payments;
        this.filter.payments = payments;
        this.updateFilter(this.filter);
      }
    );
  }

  updateScoreFilter(score: number) {
    this.filter.minscore = score;
    this.updateFilter(this.filter);
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
      max: 2200
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
        const currency = this.getCurrency();
        return val + " " + currency;
      }
    }
  }
  formatLabel(value: number) {
    return value + '%';
  }
  getCurrency() {
    return this.country == 'es' ? '€' : '$';
  }

  uncheckRadio(event, radio: number) {
    if (this.checkedRadioPayment == radio) {
      event.preventDefault()
      this.checkedRadioPayment = null;
      this.filterForm.controls['payments'].reset();
    }
  }

  ngOnDestroy() {
    if (this.productFilterUpdateSub) {
      this.productFilterUpdateSub.unsubscribe();
    }
    if (this.updateLanguageSub) {
      this.updateLanguageSub.unsubscribe();
    }
  }
}

@NgModule({
  declarations: [ProductFilterComponent],
  imports: [
    CommonModule,
    RouterModule,
    NouisliderModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    SharedModule
  ]
})
class ProductFilterModule { }