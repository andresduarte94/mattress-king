import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Filter } from '../products/product-display/filter.model';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { GlobalService } from '../shared/global.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Global variables
  countriesList: string[] = ['All countries', 'Amazon US', 'Amazon Spain'];
  countriesCodes: string[] = ['all', 'us', 'es'];
  languagesList: string[] = ['English', 'Español'];
  languagesCodes: string[] = ['en', 'es'];
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;
  isAValidLanguage: boolean;

  // Form variables
  countries = new FormControl();
  languages = new FormControl();
  productTypes: string[];
  filter: Filter = {};
  searchForm: FormGroup;
  countryForm: FormGroup;

  // UI variables
  navbarOpen = false;

  // Routing variables
  navigationEnd: Observable<NavigationEnd>;
  routePathParam: Observable<string>;
  routePathSubscription: Subscription;

  // Subscriptions
  clearFilterSub: Subscription;

  constructor(private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute,
    private globalService: GlobalService, private location: Location) { }

  ngOnInit() {
    // Product variables set-up
    this.productTypes = this.productsService.productTypes.slice();
    // Global variables set-up    
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['header'];

    // Get params from route when navigation ends
    this.navigationEnd = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => <NavigationEnd>event)
    );
    this.routePathParam = this.navigationEnd.pipe(
      map(() => {
        return this.activatedRoute.root.firstChild;
      }),
      switchMap(firstChild => {
        if (firstChild) {
          return firstChild.firstChild.params.pipe(map(params => {
            // Update language and translation words
            if (!this.languagesCodes.includes(params.language)) {
              this.location.replaceState('/' + this.language + '/home');
            }
            else {
              this.language = params.language;
              this.isAValidLanguage = true;
            }
            // Update global variables
            this.globalService.setLanguage(this.language);
            this.translationWords = this.globalService.getTranslationLanguage();
            this.componentWords = this.translationWords['header'];

            return params;
          }));
        }
        else {
          return of(null);
        }
      })
    );

    // Update language select based on route
    this.routePathSubscription = this.routePathParam.subscribe(() => {
      // Update language when routing ends
      //this.countryForm.controls['languages'].setValue(this.language);
    });

    // Create, initialize and set subscriptions for header forms
    this.createReactiveHeaderForms();
  }

  createReactiveHeaderForms() {
    // Create reactive form for country and language
    this.countryForm = new FormGroup({
      'countries': new FormControl('all'),
      'languages': new FormControl(this.language)
    });
    this.searchForm = new FormGroup({
      'search': new FormControl(''),
    });

    // Navigating with country query parameter change
    this.countryForm.controls['countries'].valueChanges.subscribe(
      (country) => {
        // Update country
        this.country = country;
        // Create url string with country and navigate to it
        let activatedRouteURL = this.activatedRoute.snapshot['_routerState'].url;
        const baseURL = activatedRouteURL.indexOf('?') > -1 ? activatedRouteURL.slice(3, activatedRouteURL.indexOf('?')) : activatedRouteURL.slice(3);
        this.router.navigateByUrl(
          this.language
          + baseURL
          + '?' + 'gl=' + this.country
        );
      });

    // Navigating with language parameter change
    this.countryForm.controls['languages'].valueChanges.subscribe(
      (language) => {
        // Don't update language if route is unknown
        if (!this.isAValidLanguage) { return; }

        // Update language and translation words
        this.language = language;
        this.globalService.setLanguage(language);
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['header'];
        let activatedRouteURL = this.activatedRoute.snapshot['_routerState'].url;
        const baseURL = activatedRouteURL.indexOf('?') > -1 ? activatedRouteURL.slice(3, activatedRouteURL.indexOf('?')) : activatedRouteURL.slice(3);
        this.router.navigateByUrl(
          this.language
          + baseURL
          + '?' + 'gl=' + this.country
        );
      });

    // Updating products on search input change
    this.searchForm.controls['search'].valueChanges.subscribe(
      (search) => {
        // Update name and description filter
        this.onSearchSubmit();
      });
  }

  onSearchSubmit() {
    // Update name and description filter
    const search = this.searchForm.controls['search'].value;
    this.filter.description = search;
    this.filter.name = search;
    this.productsService.filterUpdateEvent.next(this.filter);
    if (search == '') {
      return;
    }

    // Route to products if activatedRoute is currently not products
    const activatedRouteURL = this.activatedRoute.snapshot['_routerState'].url;
    if (!activatedRouteURL.match(/(products)/)) {
      this.router.navigate([this.language, 'products', 'all'], {
        queryParams: {
          gl: this.country
        }
      });
    }
    else if (activatedRouteURL.match(/home/)) { // If search is in Home hide banner
      this.productsService.hideBannerEvent.next(true);
    }
  }

  changeProductType(category: string) {
    this.router.navigate([this.language, 'products', category.toLowerCase()], { queryParams: { gl: this.country } });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnDestroy() {
    this.clearFilterSub.unsubscribe();
  }
}