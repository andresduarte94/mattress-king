import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '../products/product-display/filter.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes;
  }

  onSubmit() {
    this.filter.description = this.searchForm.value.search;
    this.filter.name = this.searchForm.value.search;
    sessionStorage.setItem('filter', JSON.stringify(this.filter));
    this.searchForm.reset(this.searchForm.value);
    this.router.navigate(['products/filter'], {queryParams: {filterId: 'filter' + (Math.floor(Math.random()*1000)+1)}});
  }
}
