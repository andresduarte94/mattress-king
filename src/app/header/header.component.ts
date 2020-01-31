import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '../products/product-display/filter.model';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productTypes: string[];
  faShoppingCart = faShoppingCart;
  filter: Filter = {}; 
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;
  submitted = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
  }

  onSubmit() {
    this.submitted = true;
    this.filter.description = this.searchForm.value.search;
    this.filter.name = this.searchForm.value.search;

    this.productsService.filterChanged.next(this.filter);
    //this.signupForm.reset();
  }

}
