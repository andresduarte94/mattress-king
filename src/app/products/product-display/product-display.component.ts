import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { Filter } from './filter.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  productTypes: string[];
  filter: Filter;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!params.hasOwnProperty('productType')  || params.productType == 'all') {
          this.filter = {};
        }
        else {
          this.filter = { type: this.productsService.getProductTypeId(params.productType) };
        }
        this.productsService.filterChanged.next(this.filter);
      }
    );
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
 