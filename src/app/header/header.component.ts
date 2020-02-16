import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Filter } from '../products/product-display/filter.model';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  countries = new FormControl();
  languages = new FormControl();
  countriesList: string[] = ['All countries', 'Amazon US', 'Amazon Spain'];
  countriesCodes: string[] = ['all', 'us', 'es'];
  languagesList: string[] = ['English', 'Spanish'];
  languagesCodes: string[] = ['en', 'es'];
  productTypes: string[];
  filter: Filter = {};
  searchForm: FormGroup;
  countryForm: FormGroup;
  language: string = 'en';
  country: string = 'us'
  clearFilterSub: Subscription;

  constructor(private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productTypes = this.productsService.productTypes.slice(1);

    this.countryForm = new FormGroup({
      'countries': new FormControl('all'),
      'languages': new FormControl('en')
    });

    this.searchForm = new FormGroup({
      'search': new FormControl(''),
    });

    this.countryForm.controls['countries'].valueChanges.subscribe(
      (value) => {
        this.country = value;
        this.router.navigate([this.language, this.activatedRoute.snapshot['_routerState'].url], { queryParams: {
            gl: this.country          }
        });
      });
    this.countryForm.controls['languages'].valueChanges.subscribe(
      (language) => {
        this.language = language;
         this.router.navigateByUrl(
          this.language
          + this.activatedRoute.snapshot['_routerState'].url.slice(3) 
          + '?' + 'gl=' + this.country
        );
      });

    this.searchForm.controls['search'].valueChanges.subscribe(
      (search) => {
        this.filter.description = search;
        this.filter.name = search;

        //If search is in Home route then hide banner
        if(search != '' && this.activatedRoute.snapshot['_routerState'].url.indexOf('home') > -1) {
          this.productsService.hideBannerEvent.next(true);
        }

        //Update name and description wfilter 
        this.productsService.filterUpdateEvent.next(this.filter);
      });

      this.clearFilterSub = this.productsService.clearFilterEvent.subscribe((filter: Filter) => {
        this.searchForm.controls['search'].setValue('');
      });
  }

  ngOnViewInit() {
  }

  ngOnDestroy () {
    this.clearFilterSub.unsubscribe();
  }

}
