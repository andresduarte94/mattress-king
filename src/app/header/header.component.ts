import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Filter } from '../products/product-display/filter.model';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  countries = new FormControl();
  languages = new FormControl();
  countriesList: string[] = ['All countries', 'Amazon US', 'Amazon Spain'];
  languagesList = ['Language', 'English', 'Spanish'];
  countriesCodes: string[] = ['default', 'us', 'es'];
  productTypes: string[];
  filter: Filter = {}; 
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;
  countryForm: FormGroup;


  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes.slice(1);

    this.countryForm = new FormGroup({
      'countries': new FormControl('default'),
      'languages': new FormControl('default')
    });
    
    this.countryForm.controls['countries'].valueChanges.subscribe(
      (value) => {
        this.filter.country = value;
        sessionStorage.setItem('filter', JSON.stringify(this.filter));
        this.router.navigate(['products/filter'], {queryParams: {filterId: 'filter' + (Math.floor(Math.random()*1000)+1)}});
      });

    this.countryForm.controls['languages'].valueChanges.subscribe(
      (values) => {
        console.log(values);
    });

  }

  ngOnViewInit() {
  }

  onSubmit() {
    this.filter.description = this.searchForm.value.search;
    this.filter.name = this.searchForm.value.search;
    sessionStorage.setItem('filter', JSON.stringify(this.filter));
    this.searchForm.reset(this.searchForm.value);
    this.router.navigate(['products/filter'], {queryParams: {filterId: 'filter' + (Math.floor(Math.random()*1000)+1)}});
  }
}
