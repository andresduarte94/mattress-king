import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { Filter } from './filter.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  productTypes: string[];
  filter: Filter;
  products: Product[];
  sizes;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

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
        this.productsService.filterChanged.next(this.filter);
      }
    );

    //QueryParams subscription for search bar filter
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        if(queryParams.filterId) {
            this.filter = JSON.parse(sessionStorage.getItem('filter'));
            this.productsService.filterChanged.next(this.filter);
        }
      }
    )
  }

  ngOnViewInit() {
        this.filter.type = 0; // fix hardcode
        this.sizes = this.productsService.getSizes(this.filter.type);
console.log('why');
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
