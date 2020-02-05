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
  public priceSliderValue: number[] = [0, 800];
  @ViewChild('priceSlider', { static: false }) priceSlider: NouisliderComponent;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
    this.sizes = this.productsService.getSizes(0);

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
    console.log(this.priceSliderValue)
    this.filterForm = new FormGroup({
      'productType': new FormControl(0),
      'priceSlider': new FormControl(this.priceSliderValue),
      'sizes': new FormArray(this.createSizesControl()),
      'mindiscount': new FormControl(0),
      'payments': new FormControl(1)
    });

    /* this.filterForm.setValue({
      'productType': 0,
      'priceSlider': ,
      'sizes': [],
      'mindiscount': 0,
      'payments': "1"
    });
 */
    this.filterForm.valueChanges.subscribe(
      (values) => console.log(values)
    );
  }

  createSizesControl() {
    let sizesArray = this.sizes.reduce((sizesArray, size) => {
      sizesArray.push(new FormControl(size));
      return sizesArray;
    }, [])

    return sizesArray;
  }

  ngOnViewInit() {

  }

  ngAfterContentChecked() {
    componentHandler.upgradeAllRegistered();
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
    onKeydown: this.priceSliderEventHandler,
    connect: [false, true, false],
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

  //Update products based on new filter
  updateProducts(filter: Filter) {
    let products = this.productsService.getProducts(filter);
    this.products = products;
  }

  updateScoreFilter(score: number) {
    this.filter.minscore = score;
    this.updateProducts(this.filter);
  }

  updateSize(size: string) {
    if (!this.filter.hasOwnProperty('sizes')) {
      this.filter.sizes = []
    }
    this.filter.sizes.push(size);
    this.updateProducts(this.filter);
  }


  /* @ViewChild('f', { static: false }) signupForm: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
*/
}
