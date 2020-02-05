import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Filter } from './filter.model';
import { Product } from '../product.model';
import { NgForm } from '@angular/forms';
import { NouisliderComponent } from  '../../../../node_modules/ng2-nouislider/ng2-nouislider.component';

declare var componentHandler: any;

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  productTypes: string[];
  filter: Filter;
  products: Product[] = [];
  sizes: string[] = [];
  defaultType: number = 0;
  mensualidadesConfig: any = {
    snap: true,
    start: [1],
    range: {
      'min': 1,
      '14%': 3,
      '28%': 6,
      '42%': 12,
      '56%': 18,
      '70%': 24,
      'max': 30
    },
    pips: {
      mode: 'values',
      values: [1, 3, 6, 12, 18, 24, 30],
      density: 4,
    }
  }
  mensualidadesValue = 0;
  mensualidadesOnChange() {}
  @ViewChild('someKeyboardSlider2', {'static': false}) someKeyboardSlider2: NouisliderComponent;

public someKeyboard2: number[] = [1, 3];
  @ViewChild('filterForm', { static: false }) filterForm: NgForm;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    

    this.productTypes = this.productsService.productTypes;

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
    )

    //this.filter.type = 0; // fix hardcode
    this.sizes = this.productsService.getSizes(0);
  }

ngOnViewInit() {
}

private someKeyboard2EventHandler = (e: KeyboardEvent) => {
  console.log("overridden keyboard handler");

  // determine which handle triggered the event
  let index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'));

  let multiplier: number = 0;
  let stepSize = 0.1;

  switch ( e.which ) {
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
  let newValue = [].concat(this.someKeyboard2);
  newValue[index] += delta;
  this.someKeyboard2 = newValue;
}
public someKeyboardConfig2: any = {
  keyboard: true,
onKeydown: this.someKeyboard2EventHandler,
range: {
  'min': 1,
  '14%': 3,
  '28%': 6,
  '42%': 12,
  '56%': 18,
  '70%': 24,
  'max': 30
},
}



  ngAfterContentChecked() {
    componentHandler.upgradeAllRegistered();
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
